const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let users = [
    { id: 101, name: "Ram", role: "admin" },
    { id: 102, name: "Neha", role: "user" }
];

app.get('/users', (req, res) => {
    res.status(200).json({
        success: true,
        data: users
    });
});

app.post('/users', (req, res) => {
    const newUser = req.body;
    
    if (!newUser.name || !newUser.role) {
        return res.status(400).json({ error: "Bad Request: Name and role are required" });
    }
    
    users.push(newUser);
    res.status(201).json({
        message: "User created successfully",
        data: newUser
    });
});

app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const updatedData = req.body;

    let user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ error: "Not Found: User does not exist" });
    }

    user.name = updatedData.name || user.name;
    user.role = updatedData.role || user.role;

    res.status(200).json({
        message: "User updated successfully",
        data: user
    });
});

app.delete('/users/:id', (req, res) => {
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