const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

let dbPromise = null;

async function getDB() {
    if (!dbPromise) {
        dbPromise = open({
            filename: './last_bite.db',
            driver: sqlite3.Database
        });
        
        const db = await dbPromise;
        await db.exec(`
            CREATE TABLE IF NOT EXISTS ngos (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                area TEXT,
                emoji TEXT,
                lat REAL,
                lng REAL,
                greenStars REAL DEFAULT 0,
                meals INTEGER DEFAULT 0,
                score INTEGER DEFAULT 0
            );

            CREATE TABLE IF NOT EXISTS food_items (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                ngo_name TEXT,
                ngo_id TEXT,
                emoji TEXT,
                qty INTEGER DEFAULT 1,
                originalPrice REAL,
                category TEXT,
                expiryHours INTEGER,
                entryTime INTEGER,
                status TEXT,
                discount INTEGER DEFAULT 0,
                area TEXT,
                FOREIGN KEY (ngo_id) REFERENCES ngos(id) ON DELETE SET NULL
            );

            CREATE TABLE IF NOT EXISTS orders (
                id TEXT PRIMARY KEY,
                food_id TEXT,
                item_name TEXT,
                ngo_name TEXT,
                price REAL,
                otp TEXT,
                status TEXT,
                time INTEGER,
                FOREIGN KEY (food_id) REFERENCES food_items(id) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS alerts (
                id TEXT PRIMARY KEY,
                item_name TEXT,
                ngo_name TEXT,
                qty INTEGER,
                area TEXT,
                time INTEGER,
                status TEXT,
                emoji TEXT
            );

            CREATE TABLE IF NOT EXISTS crops (
                id TEXT PRIMARY KEY,
                name TEXT,
                farmer TEXT,
                qty INTEGER,
                price REAL,
                area TEXT,
                time INTEGER,
                status TEXT
            );
        `);
    }
    return dbPromise;
}

module.exports = { getDB };
