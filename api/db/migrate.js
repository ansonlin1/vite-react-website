import sqlite3 from "sqlite3";
import { readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function migrate() {
  const db = new sqlite3.Database(join(__dirname, "../../data/wedding.db"));

  try {
    const schema = await readFile(join(__dirname, "schema.sql"), "utf8");

    db.serialize(() => {
      // Enable foreign keys
      db.run("PRAGMA foreign_keys = ON");

      // Run the schema
      schema.split(";").forEach((statement) => {
        if (statement.trim()) {
          db.run(statement, (err) => {
            if (err) {
              console.error("Migration error:", err);
            }
          });
        }
      });
    });

    console.log("Migration completed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  } finally {
    db.close();
  }
}

migrate();
