const express = require("express"); // Import Express framework

const app = express(); // Create an Express application
const PORT = 4000; // Define a port number

// Define a route for the root URL "/"
app.get("/", (req, res) => {
  res.json({ message: "Hello World" }); // Send JSON response
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
