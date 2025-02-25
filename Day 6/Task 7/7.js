const express = require('express');

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Custom error handling middleware
function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
        code: err.status || 500
    });
}

// Example API endpoint that performs division
app.get('/divide', (req, res, next) => {
    try {
        const num1 = parseFloat(req.query.num1);
        const num2 = parseFloat(req.query.num2);

        if (isNaN(num1) || isNaN(num2)) {
            const error = new Error("Invalid input. Numbers are required.");
            error.status = 400;
            throw error;
        }

        if (num2 === 0) {
            const error = new Error("Division by zero is not allowed.");
            error.status = 400;
            throw error;
        }

        res.json({ result: num1 / num2 });

    } catch (error) {
        next(error); // Pass the error to the error handler
    }
});

// Handle 404 errors (Not Found)
app.use((req, res, next) => {
    res.status(404).json({
        error: "Resource not found",
        code: 404
    });
});

// Use the custom error handler middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
