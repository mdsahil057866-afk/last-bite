const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function initDB() {
    try {
        console.log("Connecting to MySQL server...");
        // Connect to MySQL server without specifying a database first
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            multipleStatements: true // Allow running multiple SQL statements at once
        });

        console.log("Reading schema.sql...");
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        console.log("Executing SQL queries to create Database and Tables...");
        await connection.query(schema);

        console.log("✅ Database and Tables created successfully!");
        await connection.end();
        process.exit(0);
    } catch (error) {
        console.error("❌ Error initializing database:", error.message);
        
        if (error.code === 'ECONNREFUSED') {
            console.error("-> MySQL Server is not running. Please start XAMPP/WAMP MySQL server.");
        } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error("-> Invalid MySQL username or password. Check .env file.");
        }
        process.exit(1);
    }
}

initDB();
