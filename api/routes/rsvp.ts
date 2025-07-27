import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Database } from "../db/database";

const router = express.Router();

// Validation middleware
const validateRsvp = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").trim().isEmail().withMessage("Valid email is required"),
  body("attending").isBoolean().withMessage("Attendance status is required"),
  body("guestCount")
    .if(body("attending").equals("true"))
    .isInt({ min: 1, max: 5 })
    .withMessage("Guest count must be between 1 and 5"),
  body("dietaryRestrictions").optional().trim(),
  body("message").optional().trim(),
];

// Submit RSVP
router.post("/submit", validateRsvp, async (req: Request, res: Response) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, attending, guestCount, dietaryRestrictions, message } =
      req.body;

    const db = new Database();

    try {
      // Check if email already submitted RSVP
      const existing = await db.get("SELECT id FROM rsvp WHERE email = ?", [
        email,
      ]);

      if (existing) {
        // Update existing RSVP
        await db.run(
          `UPDATE rsvp 
           SET name = ?, 
               guest_count = ?, 
               meal_preference = ?,
               accessibility_needs = ?,
               updated_at = CURRENT_TIMESTAMP
           WHERE email = ?`,
          [name, guestCount, dietaryRestrictions, message, email]
        );
      } else {
        // Insert new RSVP
        await db.run(
          `INSERT INTO rsvp (
            name, 
            email, 
            guest_count, 
            meal_preference,
            accessibility_needs
          ) VALUES (?, ?, ?, ?, ?)`,
          [name, email, guestCount, dietaryRestrictions, message]
        );
      }

      res.status(200).json({
        message: existing
          ? "RSVP updated successfully"
          : "RSVP submitted successfully",
      });
    } finally {
      await db.close();
    }
  } catch (error) {
    console.error("RSVP submission error:", error);
    res.status(500).json({
      message: "An error occurred while processing your RSVP",
    });
  }
});

// Get RSVP stats (could be useful for admin dashboard)
router.get("/stats", async (req: Request, res: Response) => {
  try {
    const db = new Database();

    try {
      const stats = await db.get(`
        SELECT 
          COUNT(*) as total_responses,
          SUM(guest_count) as total_guests,
          COUNT(CASE WHEN guest_count > 1 THEN 1 END) as plus_ones
        FROM rsvp
      `);

      res.json(stats);
    } finally {
      await db.close();
    }
  } catch (error) {
    console.error("Error fetching RSVP stats:", error);
    res.status(500).json({
      message: "An error occurred while fetching RSVP statistics",
    });
  }
});

export default router;
