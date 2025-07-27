import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import rsvpRoutes from "./routes/rsvp";
import musicRoutes from "./routes/music";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/rsvp", rsvpRoutes);
app.use("/api/music", musicRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: "An unexpected error occurred",
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
