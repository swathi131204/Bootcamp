const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const users = [];
const tasks = [];

const SECRET_KEY = 'your_secret_key';

// Middleware for authentication
const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

// Register User
app.post('/api/users/register', (req, res) => {
    const { name, email, password } = req.body;
    const user = { id: users.length + 1, name, email, password };
    users.push(user);
    res.json({ message: 'User registered successfully', user });
});

// Login User
app.post('/api/users/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY);
    res.json({ message: 'Login successful', token });
});

// Create Task
app.post('/api/tasks', authenticate, (req, res) => {
    const { title, description, status } = req.body;
    const task = { id: tasks.length + 1, title, description, status };
    tasks.push(task);
    res.json({ message: 'Task created successfully', task });
});

// Get All Tasks
app.get('/api/tasks', authenticate, (req, res) => {
    res.json(tasks);
});

// Update Task
app.put('/api/tasks/:id', authenticate, (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ error: 'Task not found' });
    task.status = req.body.status || task.status;
    res.json({ message: 'Task updated successfully', task });
});

// Delete Task
app.delete('/api/tasks/:id', authenticate, (req, res) => {
    const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Task not found' });
    tasks.splice(index, 1);
    res.json({ message: 'Task deleted successfully' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
