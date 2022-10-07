var mongoose= require('mongoose')
var Schema= mongoose.Schema
var studentModel= new Schema({
    name:{
        type:String
    },      
    inforTeacher:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'teacher'}
    ]
    
})
module.exports=mongoose.model("studentt",studentModel)