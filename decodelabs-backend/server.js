const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/users', (req, res) => {
    const users = [
        { id: 101, name: "Aman", role: "admin" },
        { id: 102, name: "Neha", role: "user" }
    ];
    res.status(200).json({
        success: true,
        data: users
    });
});

app.post('/users', (req, res) => {
    const newUser = req.body;
    
    if (!newUser.name) {
        return res.status(400).json({ error: "Bad Request: Name is required" });
    }
    
    res.status(201).json({
        message: "User created successfully",
        data: newUser
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});