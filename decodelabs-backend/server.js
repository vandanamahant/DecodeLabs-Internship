const express = require('express');
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 3000;

const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 ,// IP limit
});
app.use(limiter);

app.use(express.json());

let users = [
    { id: 101, name: "Ram", role: "admin", email: "ram@example.com" },
    { id: 102, name: "Neha", role: "user", email: "neha@example.com" }
];

const verifyAuth = (req, res, next) => {
    const apiKey = req.headers['authorization'];
    if (apiKey === process.env.API_SECRET_TOKEN) {
        next();
    } else {
        res.status(401).json({ error: "Unauthorized: Invalid or missing token" });
    }
};

const verifyAdmin = (req, res, next) => {
    const userRole = req.headers['role'];
    if (userRole === 'admin') {
        next();
    } else {
        res.status(403).json({ error: "Forbidden: Admin rights required" });
    }
};

app.get('/users', (req, res) => {
    res.status(200).json({
        success: true,
        data: users
    });
});

app.post('/users', verifyAuth, (req, res) => {
    const newUser = req.body;
    
    if (!newUser.name || !newUser.role || !newUser.email) {
        return res.status(400).json({ error: "Bad Request: Name, role, and email are required" });
    }
    
    if (!newUser.email.includes('@') || !newUser.email.includes('.')) {
        return res.status(400).json({ error: "Semantic Error: Invalid email format" });
    }
    
    users.push(newUser);
    res.status(201).json({
        message: "User created successfully",
        data: newUser
    });
});

app.put('/users/:id', verifyAuth, (req, res) => {
    const userId = parseInt(req.params.id);
    const updatedData = req.body;

    let user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ error: "Not Found: User does not exist" });
    }

    if (updatedData.email && (!updatedData.email.includes('@') || !updatedData.email.includes('.'))) {
        return res.status(400).json({ error: "Semantic Error: Invalid email format" });
    }

    user.name = updatedData.name || user.name;
    user.role = updatedData.role || user.role;
    user.email = updatedData.email || user.email;

    res.status(200).json({
        message: "User updated successfully",
        data: user
    });
});

app.delete('/users/:id', verifyAuth, verifyAdmin, (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ error: "Not Found: User does not exist" });
    }

    const deletedUser = users.splice(userIndex, 1);
    res.status(200).json({
        message: "User removed successfully",
        data: deletedUser
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});