const express = require("express");
const Joi = require("joi");

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

// Define validation schema using Joi
const schema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(18).required(),
});

// POST endpoint with validation
app.post("/users", (req, res) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  res.status(201).json({ message: "User created successfully", data: req.body });
});

// Start server
const PORT = 7000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
