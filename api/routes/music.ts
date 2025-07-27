import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Database } from "../db/database";
import { Filter } from "bad-words";

const router = express.Router();
const filter = new Filter();

// Validation middleware
const validateSongRequest = [
  body("songTitle").trim().notEmpty().withMessage("Song title is required"),
  body("artist").trim().optional(),
  body("rsvpId").optional().isInt(),
];

// Submit song request
router.post(
  "/request",
  validateSongRequest,
  async (req: Request, res: Response) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { songTitle, artist, rsvpId } = req.body;

      // Check for inappropriate content
      if (filter.isProfane(songTitle) || (artist && filter.isProfane(artist))) {
        return res.status(400).json({
          message: "Song request contains inappropriate content",
        });
      }

      const db = new Database();

      try {
        // Check for duplicate request
        const existing = await db.get(
          "SELECT id FROM song_requests WHERE LOWER(song_title) = LOWER(?) AND (artist IS NULL OR LOWER(artist) = LOWER(?))",
          [songTitle, artist || ""]
        );

        if (existing) {
          return res.status(400).json({
            message: "This song has already been requested",
          });
        }

        // Insert new song request
        const result = await db.run(
          `INSERT INTO song_requests (
          song_title,
          artist,
          rsvp_id
        ) VALUES (?, ?, ?)`,
          [songTitle, artist, rsvpId]
        );

        res.status(201).json({
          message: "Song request submitted successfully",
          id: result.lastID,
        });
      } finally {
        await db.close();
      }
    } catch (error) {
      console.error("Song request error:", error);
      res.status(500).json({
        message: "An error occurred while processing your song request",
      });
    }
  }
);

// Get song requests (optionally filtered by RSVP ID)
router.get("/list", async (req: Request, res: Response) => {
  try {
    const db = new Database();
    const rsvpId = req.query.rsvpId;

    try {
      let query = `
        SELECT 
          sr.id,
          sr.song_title,
          sr.artist,
          sr.created_at,
          sr.added_to_playlist,
          r.name as requested_by
        FROM song_requests sr
        LEFT JOIN rsvp r ON sr.rsvp_id = r.id
      `;

      const params = [];
      if (rsvpId) {
        query += " WHERE sr.rsvp_id = ?";
        params.push(rsvpId);
      }

      query += " ORDER BY sr.created_at DESC";

      const songs = await db.all(query, params);
      res.json(songs);
    } finally {
      await db.close();
    }
  } catch (error) {
    console.error("Error fetching song requests:", error);
    res.status(500).json({
      message: "An error occurred while fetching song requests",
    });
  }
});

export default router;
