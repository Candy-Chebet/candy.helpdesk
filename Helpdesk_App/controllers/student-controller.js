import Student from "../models/Student";

const getAllStudent =async (req, res, next) => {
    let students;
    try {
        students = await Student.find();
    } catch (err) {
        console.log(err); 
    }
    if (!students){
        return res.status(404).json({message: "No Students Found"});
    }
    return res.status(200).json({ students })
        
};