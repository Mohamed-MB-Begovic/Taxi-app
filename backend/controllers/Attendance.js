// import { UploadStream } from "cloudinary";
import Attendance from "../models/Attendance.js";
import EmployeeModel from "../models/Employeemodel.js";

export const register = async (req, res) => {
  const id=req.body;
  try {
    // if present emp is only one
    if(req.body.length===1){
    const data= new Attendance({
      employee_id:id[0].employee,
      user:req.user,
      fullname:req.body[0].fullname,
      phoneNo:req.body[0].phoneNo,
      image:req.body[0].image,
      status:'present'
    })
    await data.save();
// absent employees
    const others=await EmployeeModel.find({_id:{$ne:id[0].employee}})
    // console.log(others[0]._id)
    if(!others) return console.log('no others employees')
    if(others.length ===1){
      const data= new Attendance({
        employee_id:others[0]._id,
        fullname:others[0].fullname,
      phoneNo:others[0].phoneNo,
      image:others[0].image,
          user:req.user,
          status:'absent'
        })
        await data.save();
    }else{
      others.forEach(async (emp)=>{
        const data= new Attendance({
          employee_id:emp._id,
          fullname:emp.fullname,
      phoneNo:emp.phoneNo,
      image:emp.image,
          user:req.user,
          status:'absent'
        })
        await data.save();
      })
    }
  }else{
    // if present emplooyees are greater than 1
    const ids=req.body
    ids.forEach(async (emp)=>{
      const data= new Attendance({
        employee_id:emp.employee,
        user:req.user,
        fullname:emp.fullname,
        phoneNo:emp.phoneNo,
        image:emp.image,
        status:'present'
      })
      await data.save();
    })
    const extractedIDS=ids.map(id=>id.employee)
    const others =await EmployeeModel.find({_id:{$nin:extractedIDS}})
    // console.log(others)
      if(!others) return console.log('no others employees')
      if(others.length ===1){
        // console.log('less others happen')
  
        const data= new Attendance({
          employee_id:others[0]._id,
          fullname:others[0].fullname,
      phoneNo:others[0].phoneNo,
      image:others[0].image,
            user:req.user,
            status:'absent'
          })
          await data.save();
      }else{
        others.forEach(async (emp)=>{
          const data= new Attendance({
            employee_id:emp.employee,
            user:req.user,
            fullname:emp.fullname,
            phoneNo:emp.phoneNo,
            image:emp.image,
            status:'absent'
          })
          await data.save();
        })
      }

 
  }
  } catch (error) {
    console.log('error in registering attendance'+error)
  }
   
};

export const getAttendances = async (req, res) => {
  try {
    // console.log(req);
    const employees = await EmployeeModel.find({ user: req.user._id })
      .populate({ path: "user", model: "userModel" })
      
    res.status(201).send(employees);
    // console.log("employees:", employees);
  } catch (error) {
    console.log("error in get employee attedance " + error);
  }
};
export const viewAttendances = async (req, res) => {
  try {
    // console.log(req);
    const employees = await Attendance.find({ date: req.params.date })    
    res.status(201).send(employees);
    // console.log("employees:", employees);
  } catch (error) {
    console.log("error in view employee attedance " + error);
  }
};

