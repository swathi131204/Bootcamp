const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const StudModel = require('./Model/model')



const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://swathi:swathi12345@admin.z7grm.mongodb.net/?retryWrites=true&w=majority&appName=admin")

app.get('/getUsers', (req, res) =>{
    StudModel.find({})
    .then(stud => res.json(stud))
    .catch(err => res.json(err))
})

app.get("/getUser/:id", (req, res) =>{
    const id = req.params.id;
    StudModel.findById({_id:id})
    .then(stud => res.json(stud))
    .catch(err => res.json(err))
})

app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    StudModel.findByIdAndUpdate({_id: id}, {
        name: req.body.name,
        age: req.body.age,
        stud: req.body.stud
    })
    .then(stud => res.json(stud))
    .catch(err => res.json(err))
})

app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    StudModel.findByIdAndDelete({_id: id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})


app.post('/stud', (req, res) => {
     StudModel.create(req.body)
     .then(stud => res.json(stud))
     .catch(err => res.json(err))
})



app.listen(3001, () => {
    console.log("server is running")
})