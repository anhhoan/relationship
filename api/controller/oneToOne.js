   var studentModel=require('../model/index')
 var teacherModel= require('../model/teacherModel')
 const getTeacher=async(req,res)=>{
    try {
        const listTeacher=await teacherModel.find({})
        res.send({
            message:'success',
            listTeacher
        })
    } catch (error) {
        res.send({
            message:'failure'
        })
    }
 }
 const getStudent= async(req,res)=>{
    try { 
        const listStudent= await studentModel.find({})
        res.send({
            listStudent,
            message:'success'
        })
        
    } catch (error) {
        res.send({
            message:'error'
        })
        
    }
 }
 const addOneToOne= async(req,res)=>{
    try {
        const nameStudent=req.body.nameStudent 
        const nameTeacher=req.body.nameTeacher         
        console.log(nameStudent,nameTeacher);   
        const studentData=await studentModel.create({name:nameStudent,inforTeacher:[]})
        const teacherData= await teacherModel.create({name:nameTeacher,inforStudent:studentData._id})
        console.log('a');
        const updateStudent=await studentModel.findByIdAndUpdate(studentData._id,{inforTeacher:teacherData._id},{new:true})
        res.send({
            teacherData,
            updateStudent,
            message:'success'
        })
    } catch (error) {
        res.send({
            message:'errorlll'
        })
        
    }
 }

const addTeacherWithLink=async(req,res)=>{
    try {
        const name=req.body.name
        const idStudent=req.body.id
        const findStudent = await studentModel.findById(idStudent)

        const teacherData = await teacherModel.create({name:name, inforStudent:[idStudent]})

        const idTeacher=teacherData._id  
     
        if(findStudent.inforTeacher.length>0){
            const studentUpdate=await studentModel.findByIdAndUpdate(idStudent,{inforTeacher:[idTeacher]},{new:true})
            const idOldTeacher = findStudent.inforTeacher
            const oldTeacher= await teacherModel.findByIdAndUpdate(idOldTeacher,{inforStudent:[]},{new:true})
            res.send({
                message:'success',
                teacherData,
                studentUpdate,
                oldTeacher
    
            })
        }
        else{
            const studentUpdate=await studentModel.findByIdAndUpdate(idStudent,{inforTeacher:[idTeacher]},{new:true})
            console.log('loll');
            res.send({
                message:'success',
                studentUpdate,
                teacherData
            })
            
        }
        

        
    } catch (error) {
        res.send({
            message:'failure'
        })
        
    }
}

const addStudentWithLink=async(req,res)=>{
    try {
        const name=req.body.name
        const idTeacher=req.body.id
        const findTeacher = await teacherModel.findById(idTeacher)

        const StudentData = await studentModel.create({name:name, inforTeacher:[idTeacher]})

        const idStudent=StudentData._id  
     
        if(findTeacher.inforStudent.length>0){
            const TeacherUpdate=await teacherModel.findByIdAndUpdate(idTeacher,{inforStudent:[idStudent]},{new:true})
            const idOldStudent = findTeacher.inforStudent
            const oldStudent= await teacherModel.findByIdAndUpdate(idOldStudent,{inforTeacher:[]},{new:true})
            res.send({
                message:'success',
                StudentData,
                TeacherUpdate,
                oldStudent
    
            })
        }
        else{
            const teacherUpdate=await teacherModel.findByIdAndUpdate(idTeacher,{inforStudent:[idStudent]},{new:true})
            console.log('loll');
            res.send({
                message:'success',
                teacherUpdate,
                StudentData
            })
            
        }
        

        
    } catch (error) {
        res.send({
            message:'failure'
        })
        
    }
}

 const deleteTeacherOneToOne= async(req,res)=>{
    try { 
        const idTeacher=req.body.idTeacher
        const teacherDelete=await teacherModel.findByIdAndDelete(idTeacher)
        const idStudent= teacherDelete.inforStudent
        const studentUpdate= await studentModel.findByIdAndUpdate(idStudent,{inforTeacher:[]},{new:true})   
        res.send({
            studentUpdate,
            message:'success'
        })
        
    } catch (error) {
        res.send({

            message:'error'
        })
        
    }
 }


 const deleteStudentOneToOne= async(req,res)=>{
    try { 
        const idStudent=req.body.idStudent
        const StudentDelete=await studentModel.findByIdAndDelete(idStudent)
        const idTeacher= StudentDelete.inforStudent
        const teacherUpdate= await teacherModel.findByIdAndUpdate(idTeacher,{inforStudent:[]},{new:true})   
        res.send({
            teacherUpdate,
            message:'success'
        })
        
    } catch (error) {
        res.send({

            message:'error'
        })
        
    }
 }
 const updateTeacher=async(req,res)=>{
    try {
        const idTeacher= req.body.idTeacher
        const idStudent=req.body.idStudent
        const arrStudent=[]
        let oldStudent
        let oldTeacher
        arrStudent.push(idStudent)
        const findTeacher= await teacherModel.findById(idTeacher)
        if(findTeacher.inforStudent.length>0){
            const idOldStudent= findTeacher.inforStudent
             oldStudent= await studentModel.findByIdAndUpdate(idOldStudent,{inforTeacher:[]},{new:true})           
        }
        const findStudent= await studentModel.findById(idStudent)
        if(findStudent.inforTeacher.length>0){
            const idOldTeacher= findStudent.inforTeacher
            oldTeacher= await teacherModel.findByIdAndUpdate(idOldTeacher,{inforStudent:[]},{new:true})           
        }
        const teacherUpdate = await teacherModel.findByIdAndUpdate(idTeacher,{inforStudent:arrStudent},{new:true})
        const studentUpdate= await studentModel.findByIdAndUpdate(idStudent,{inforTeacher:[idTeacher]},{new:true})
        res.send({
            message:'success',
            teacherUpdate,
            studentUpdate,
            oldStudent,
            oldTeacher
        })
       
    } catch (error) {
        res.send({message:'failure'})
    }
 }

 
 
 
 module.exports={
    getStudent,
    getTeacher,
    deleteTeacherOneToOne,
    updateTeacher,
    addOneToOne,
    addTeacherWithLink,
    deleteStudentOneToOne,
    addStudentWithLink
   
 }