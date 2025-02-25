const express = require("express");
const fs = require("fs"); // File System module for reading/writing JSON file
const app = express();
const PORT = 5000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Function to read users from the JSON file
const readUsers = () => {
  try {
    const data = fs.readFileSync("users.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Function to write users to the JSON file
const writeUsers = (users) => {
  fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
};

// GET /users - Fetch all users
app.get("/users", (req, res) => {
  const users = readUsers();
  res.json(users);
});

// GET /users/:id - Fetch user by ID
app.get("/users/:id", (req, res) => {
  const users = readUsers();
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// POST /users - Add a new user
app.post("/users", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  let users = readUsers();
  const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
  const newUser = { id: newId, name };

  users.push(newUser);
  writeUsers(users);

  res.json({ message: "User added", user: newUser });
});

// PUT /users/:id - Update a user
app.put("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const { name } = req.body;

  let users = readUsers();
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  users[userIndex].name = name || users[userIndex].name;
  writeUsers(users);

  res.json({ message: "User updated", user: users[userIndex] });
});

// DELETE /users/:id - Remove a user
app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  let users = readUsers();
  const filteredUsers = users.filter((u) => u.id !== userId);

  if (users.length === filteredUsers.length) {
    return res.status(404).json({ error: "User not found" });
  }

  writeUsers(filteredUsers);

  res.json({ message: "User deleted" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
