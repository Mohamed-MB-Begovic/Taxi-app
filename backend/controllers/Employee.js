import EmployeeModel from "../models/Employeemodel.js";
import AssingCar from "../models/Assigncar.js";
import Cars from "../models/CarModel.js";
import cloudinary from "../config/Cloudinary.js";
import Attendance from "../models/Attendance.js";

import axios from "axios";

export const RegisterEmp = async (req, res) => {
  const { email, fullname, phoneNo } = req.body;
  // const isUserExist = EmployeeModel.findOne({ email: email.toLowerCase() });
  // if (!isUserExist) {
  //   return res.status(400).send("email already exist");
  // }

  try {
    const currentUser = req.user._id;

    let result;
    if (req.file) {
      let encodedImage = `data:image/jpeg;base64,${req.file.buffer.toString(
        "base64"
      )}`;
      // console.log(encodedImage);
      result = await cloudinary.uploader.upload(encodedImage, {
        resource_type: "image",
        transformation: [{ width: 500, height: 500, crop: "limit" }],
        encoding: "base64",
      });
    }
    const NewEmployee = new EmployeeModel({
      email: email,
      fullname: fullname,
      phoneNo: phoneNo,
      image: result?.url || null,
      user: currentUser,
      status: "InActive",
    });
    // const newEmpAttendance = new Attendance({
    //   email: email,
    //   name: fullname,
    //   phoneNo: phoneNo,
    //   image: result?.url || null,
    //   user: currentUser,
    //   status: "absent",
    //   emp_id: NewEmployee._id,
    // });

    await NewEmployee.save();
    // await newEmpAttendance.save();
    res.status(201).send(NewEmployee);
    // console.log(NewEmployee);
    // console.log(currentUser);
  } catch (error) {
    console.log("error in register emp " + error);
    res.status(400).send(error.message);
  }
};

export const getEmp = async (req, res) => {
  try {
    // console.log(req);
    const employees = await EmployeeModel.find({ user: req.user._id })
      .populate({ path: "user", model: "userModel" })
      .sort({
        createdAt: 1,
      });
    res.status(201).send(employees);
    // console.log("employees:", employees);
  } catch (error) {
    console.log("error in get employee data " + error);
  }
};
// export const attendanceEmp = async (req, res) => {
//   try {
//     // console.log(req);
//     const employees = await EmployeeModel.find({ user: req.user._id })
//       .populate({ path: "user", model: "userModel" })
//       .sort({
//         createdAt: 1,
//       });
//     res.status(201).send(employees);
//     // console.log("employees:", employees);
//   } catch (error) {
//     console.log("error in get employee data " + error);
//   }
// };

export const deleteEmp = async (req, res, next) => {
  try {
    const emp = await EmployeeModel.findByIdAndDelete(req.params.emp_id);
    if (!emp) return res.status(400).send("employee not found");
    const empId = emp.emp_id;
    // console.log(emp);
    const findCar = await AssingCar.find({ emp_id: empId });
    if (findCar.length > 0) {
      const CarId = findCar[0].car_id;
      // console.log(CarId);
      const updateCarStatus = await Cars.updateOne(
        { car_id: CarId },
        { $set: { status: "Not working" } },
        { new: true }
      );
    }

    const delemp = await AssingCar.deleteOne({ emp_id: emp.emp_id });

    // if (!delemp) {
    //   res.status(200).json({
    //     message: "Employee deleted successfully",
    //   });
    // }
    const delAttendEmp = await Attendance.deleteOne({
      emp_id: req.params.emp_id,
    });

    res.status(200).json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateEmp = async (req, res, next) => {
  let updatedFields = {
    email: req.body.email,
    fullname: req.body.fullname,
    phoneNo: req.body.phoneNo,
  };

  try {
    const currentUser = req.user._id;

    let result;
    if (req.file) {
      let encodedImage = `data:image/jpeg;base64,${req.file.buffer.toString(
        "base64"
      )}`;
      // console.log(encodedImage);
      result = await cloudinary.uploader.upload(encodedImage, {
        resource_type: "image",
        transformation: [{ width: 500, height: 500, crop: "limit" }],
        encoding: "base64",
      });
      updatedFields.image = result.url;
    }

    const emp = await EmployeeModel.findByIdAndUpdate(
      req.params.emp_id,
      updatedFields,
      {
        new: true,
      }
    );
    if (!emp) return res.status(400).send("employee not found");
    res.status(200).json({
      message: "employee updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const updateEmpStatus = async (req, res, next) => {
  let updatedFields = {
    status: "working",
  };

  try {
    const emp = await EmployeeModel.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      {
        new: true,
      }
    );
    // if (!emp) return res.status(400).send("employee not found");
    // res.status(200).json({
    //   message: "employee updated successfully",
    // });
  } catch (error) {
    next(error);
  }
};

export const TotalEmp = async (req, res) => {
  try {
    // console.log(req);
    const totalemployee = await EmployeeModel.countDocuments({
      user: req.user._id,
    });
    // .populate({ path: "user", model: "userModel" })
    // .sort({
    //   createdAt: 1,
    // });
    res.json(totalemployee);
    // console.log("total employee:", totalemployee);
  } catch (error) {
    console.log("error in get total employee  " + error);
    res.send(error);
  }
};

export const idleEmp = async (req, res) => {
  try {
    // console.log("idle employee happend");
    const response = await EmployeeModel.find(
      { user: req.user._id, status: "InActive" }
      // $and: [({ user: req.user._id }, { status: "InActive" })],
    );
    // console.log(response);
    res.status(201).send(response);
  } catch (error) {
    console.log("error in idle emp controller" + error);
  }
};

export const findEmp = async (req, res) => {
  // console.log(req.params.id);
  try {
    const response = await EmployeeModel.find({
      user: req.user._id,
      emp_id: req.params.id,
    });
    // console.log("response kjkjk" + response);
    res.status(201).send(response);
  } catch (error) {
    console.log("error in find emp " + error);
  }
};

// export const searchEmp = async (req, res) => {
//   console.log("search emp");
//   console.log(req.params.text);
//   try {
//     const employee = await EmployeeModel.find({ emp_id: req.params.text });
//     if (!employee) return res.status(400).send("emp not found");
//     res.status(200).send(employee);
//     console.log(employee);
//   } catch (error) {
//     console.log("errror in search emp" + error);
//   }
// };
