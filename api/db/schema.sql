-- SQLite schema for wedding website

-- RSVP table
CREATE TABLE IF NOT EXISTS rsvp (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    guest_count INTEGER NOT NULL CHECK (guest_count > 0),
    meal_preference TEXT,
    accessibility_needs TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Song requests table
CREATE TABLE IF NOT EXISTS song_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rsvp_id INTEGER,
    song_title TEXT NOT NULL,
    artist TEXT,
    added_to_playlist BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rsvp_id) REFERENCES rsvp(id)
);

-- Indexes
CREATE INDEX idx_rsvp_email ON rsvp(email);
CREATE INDEX idx_song_requests_rsvp_id ON song_requests(rsvp_id);
