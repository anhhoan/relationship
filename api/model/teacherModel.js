var mongoose= require('mongoose')
var Schema= mongoose.Schema
var teacherModel= new Schema({
    name:{
        type:String
    },
    inforStudent:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'studentt'
    }]
    
})
module.exports=mongoose.model("teacher",teacherModel)