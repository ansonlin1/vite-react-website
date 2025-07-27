const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { body, validationResult } = require('express-validator');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Database setup
const dbPath = path.join(__dirname, 'db', 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// Initialize database tables
db.serialize(() => {
  // RSVP table
  db.run(`CREATE TABLE IF NOT EXISTS rsvps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    guests INTEGER DEFAULT 1,
    dietary TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Music requests table
  db.run(`CREATE TABLE IF NOT EXISTS music_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    song_title TEXT NOT NULL,
    artist TEXT NOT NULL,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// RSVP submission endpoint
app.post('/api/rsvp', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('guests').isInt({ min: 1 }).withMessage('Number of guests must be at least 1')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    });
  }

  const { name, email, phone, guests, dietary, message } = req.body;

  db.run(
    `INSERT INTO rsvps (name, email, phone, guests, dietary, message) VALUES (?, ?, ?, ?, ?, ?)`,
    [name, email, phone, guests, dietary, message],
    function(err) {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      res.status(201).json({
        id: this.lastID,
        message: 'RSVP submitted successfully'
      });
    }
  );
});

// Music request submission endpoint
app.post('/api/music-request', [
  body('name').notEmpty().withMessage('Name is required'),
  body('songTitle').notEmpty().withMessage('Song title is required'),
  body('artist').notEmpty().withMessage('Artist is required')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    });
  }

  const { name, songTitle, artist, message } = req.body;

  db.run(
    `INSERT INTO music_requests (name, song_title, artist, message) VALUES (?, ?, ?, ?)`,
    [name, songTitle, artist, message],
    function(err) {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      res.status(201).json({
        id: this.lastID,
        message: 'Music request submitted successfully'
      });
    }
  );
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Wedding API server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('Database connection closed.');
    }
    process.exit(0);
  });
});

module.exports = app;
