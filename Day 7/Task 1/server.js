const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
mongoose.connect("mongodb+srv://swathi:swathi12345@admin.z7grm.mongodb.net/?retryWrites=true&w=majority&appName=admin")


.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));
const studentSchema = new mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    major: {type: String, required: true},
    rollNo: {type: String, required: true, unique: true},
});

const Student = mongoose.model("Student", studentSchema);

app.get('/students',async(req,res)=>{
    try{
        const students = await Student.find()
        res.status(201).json(students)
    }catch(error){
        res.send(error);
    }
})
app.post("/students", async (req, res) => {
    try {
        const {name, age, major, rollNo} = req.body;
        const newStudent = new Student({name, age, major, rollNo});
        await newStudent.save();

        res.status(201).json({message: "Student added successfully", studentId: newStudent._id});
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({error: "Roll number already exists"});
        }
        res.status(500).json({error: "Internal server error"});
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));