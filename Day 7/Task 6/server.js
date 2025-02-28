const express = require("express");
const Joi = require("joi");

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// Validation schema for student data
const studentSchema = Joi.object({
    studentId: Joi.string().alphanum().min(3).max(10).required(),
    name: Joi.string().min(3).max(50).required(),
    age: Joi.number().integer().min(18).max(100).required(),
    email: Joi.string().email().required(),
    course: Joi.string().min(3).max(50).required(),
});

// Sample POST endpoint with validation
app.post("/students", (req, res) => {
    const { error } = studentSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    res.status(201).json({ message: "Student added successfully", data: req.body });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
