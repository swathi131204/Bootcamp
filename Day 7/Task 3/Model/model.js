const mongoose = require('mongoose');
const StudentSchema = mongoose.Schema(
    {
        rollNo:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        age:{
            type:Number,
            required:true
        },
        major:{
            type:String,
            required:true
        }
    }
    ,{
        Timestamps :true
    }
) 



const Student= mongoose.model('Student',StudentSchema);
module.exports = Student;