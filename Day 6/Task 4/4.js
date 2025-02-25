const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
];

app.post('/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.json({ message: 'User added' });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
