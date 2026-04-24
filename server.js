const express = require('express');
const cors = require('cors');
const { getDB } = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static files from the current directory (frontend)
const path = require('path');
app.use(express.static(path.join(__dirname, '')));

// init db
getDB().then(() => {
    console.log("db connected");
}).catch(err => {
    console.error("❌ Database initialization failed:", err);
});

// health
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'backend running' });
});

// food endpoints
app.get('/api/food', async (req, res) => {
    try {
        const db = await getDB();
        const rows = await db.all('SELECT * FROM food_items ORDER BY entryTime DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/food', async (req, res) => {
    const { id, name, ngo_name, ngo_id, emoji, qty, originalPrice, category, expiryHours, entryTime, status, discount, area } = req.body;
    try {
        const db = await getDB();
        const query = `INSERT INTO food_items (id, name, ngo_name, ngo_id, emoji, qty, originalPrice, category, expiryHours, entryTime, status, discount, area) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        await db.run(query, [id, name, ngo_name, ngo_id, emoji, qty, originalPrice, category, expiryHours, entryTime, status, discount, area]);
        res.status(201).json({ message: 'Food item added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ngos
app.get('/api/ngos', async (req, res) => {
    try {
        const db = await getDB();
        const rows = await db.all('SELECT * FROM ngos ORDER BY score DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/ngos', async (req, res) => {
    const { id, name, area, emoji, lat, lng, greenStars, meals, score } = req.body;
    try {
        const db = await getDB();
        const query = `INSERT INTO ngos (id, name, area, emoji, lat, lng, greenStars, meals, score) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        await db.run(query, [id, name, area, emoji, lat, lng, greenStars, meals, score]);
        res.status(201).json({ message: 'NGO added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// orders
app.get('/api/orders', async (req, res) => {
    try {
        const db = await getDB();
        const rows = await db.all('SELECT * FROM orders ORDER BY time DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/orders', async (req, res) => {
    const { id, food_id, item_name, ngo_name, price, otp, status, time } = req.body;
    try {
        const db = await getDB();
        const query = `INSERT INTO orders (id, food_id, item_name, ngo_name, price, otp, status, time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        await db.run(query, [id, food_id, item_name, ngo_name, price, otp, status, time]);
        res.status(201).json({ message: 'Order created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// alerts
app.get('/api/alerts', async (req, res) => {
    try {
        const db = await getDB();
        const rows = await db.all('SELECT * FROM alerts ORDER BY time DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/alerts', async (req, res) => {
    const { id, item_name, ngo_name, qty, area, time, status, emoji } = req.body;
    try {
        const db = await getDB();
        const query = `INSERT INTO alerts (id, item_name, ngo_name, qty, area, time, status, emoji) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        await db.run(query, [id, item_name, ngo_name, qty, area, time, status, emoji]);
        res.status(201).json({ message: 'Alert created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/alerts/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const db = await getDB();
        await db.run('UPDATE alerts SET status = ? WHERE id = ?', [status, id]);
        res.json({ message: 'Alert updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log('server started on ' + PORT);
});
