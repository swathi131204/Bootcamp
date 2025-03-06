const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// ✅ Corrected MongoDB Connection String (Use Lowercase db name)
const MONGO_URI = "mongodb+srv://swathi:swathi12345@admin.z7grm.mongodb.net/?retryWrites=true&w=majority&appName=admin";

mongoose
  .connect(MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));
  
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  course: String,
});

const Student = mongoose.model("Student", studentSchema);

// API to get students with pagination
app.get("/students", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5; // 5 students per page
    const skip = (page - 1) * limit;

    const students = await Student.find().skip(skip).limit(limit);
    const total = await Student.countDocuments();

    res.json({
      students,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
