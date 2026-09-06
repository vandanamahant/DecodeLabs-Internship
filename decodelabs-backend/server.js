const express = require('express');
const pool = require('./config/db');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/api/users', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users');
        res.status(200).json({
            success: true,
            data: rows
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/users', async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: "Bad Request: Name and email are required" });
        }

        if (!email.includes('@') || !email.includes('.')) {
            return res.status(400).json({ error: "Semantic Error: Invalid email format" });
        }

        const [result] = await pool.query(
            'INSERT INTO users (name, email) VALUES (?, ?)',
            [name, email]
        );

        res.status(201).json({
            message: "User created successfully",
            userId: result.insertId,
            data: { id: result.insertId, name, email }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.put('/api/users/:id', async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const { name, email } = req.body;

        const [existingUser] = await pool.query('SELECT * FROM users WHERE user_id = ?', [userId]);
        if (existingUser.length === 0) {
            return res.status(404).json({ error: "Not Found: User does not exist" });
        }

        const updatedName = name || existingUser[0].name;
        const updatedEmail = email || existingUser[0].email;

        await pool.query(
            'UPDATE users SET name = ?, email = ? WHERE user_id = ?',
            [updatedName, updatedEmail, userId]
        );

        res.status(200).json({
            message: "User updated successfully",
            data: { id: userId, name: updatedName, email: updatedEmail }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.delete('/api/users/:id', async (req, res) => {
    try {
        const userId = parseInt(req.params.id);

        const [existingUser] = await pool.query('SELECT * FROM users WHERE user_id = ?', [userId]);
        if (existingUser.length === 0) {
            return res.status(404).json({ error: "Not Found: User does not exist" });
        }

        await pool.query('DELETE FROM users WHERE user_id = ?', [userId]);

        res.status(200).json({
            message: "User removed successfully",
            deletedUserId: userId
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running smoothly on http://localhost:${PORT}`);
});