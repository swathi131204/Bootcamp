const mongoose = require('mongoose')
 const studentSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required: [true ,"please enter a student name"]
        },
        age:{
            type:String,
            required: [true ,"please enter a student age"]
        },
       major:{
            type:String,
            required: true ,
        },
        rollNo:{
            type:String,
            required: [true ,"please enter a student rollNo"]
        }  
    },
    {
        timestamps:true
    }
 )
 const student = mongoose.model('student', studentSchema);

 module.exports = student;