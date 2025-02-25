const express = require("express");
const app = express();

// Sample user data
const users = [
    { id: 1, name: "John" },
    { id: 2, name: "Alice" },
    { id: 3, name: "Bob" }
];

// Define the GET endpoint to fetch a user by ID

app.get('/users',(req,res)=>{
    res.json(users);
})

app.get("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id); // Extract ID from URL and convert to number
    const user = users.find(user => user.id === userId); // Find user with matching ID
    res.json(user)
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
