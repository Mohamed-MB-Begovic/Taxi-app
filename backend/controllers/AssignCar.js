import AssingCar from "../models/Assigncar.js";
import EmployeeModel from "../models/Employeemodel.js";
import Cars from "../models/CarModel.js";

export const getAssinedCars = async (req, res) => {
  // console.log(req);
  try {
    // console.log("get car");
    const Cars = await AssingCar.find({ user: req.user._id })
      .populate({ path: "user", model: "userModel" })
      .sort({
        createdAt: 1,
      });
    res.status(201).send(Cars);
    // console.log("employees:", Cars);
  } catch (error) {
    console.log("error in get assing Cars data " + error);
  }
};

export const assigncar = async (req, res) => {
  const { type, plateNo, registeredDate, name, car_id, emp_id } = req.body;
  //   console.log("type" + type);
  // const iscarExist = Cars.findOne({ plateNo: plateNo });
  // if (!iscarExist) return res.status(400).send("this car already exist");
  try {
    const currentUser = req.user._id;

    const NewAssign = new AssingCar({
      type: type,
      plateNo: plateNo,
      registeredDate: registeredDate,
      emp_name: name,
      emp_id: emp_id,
      car_id: car_id,
      user: currentUser,
    });

    await NewAssign.save();
    res.status(201).send(NewAssign);
    // console.log(NewAssign);
  } catch (error) {
    console.log("error in assign car " + error);
    res.status(400).send(error.message);
  }
};

export const deleteAssign = async (req, res, next) => {
  // console.log(req.params.id);
  const deleteId = req.params.id;
  try {
    const DeletedAssign = await AssingCar.find({ _id: deleteId });
    // console.log(DeletedAssign);
    const carId = DeletedAssign[0].car_id;
    const empId = DeletedAssign[0].emp_id;
    const data = await AssingCar.findByIdAndDelete(req.params.id);
    if (!data) return res.status(400).send("employee not found");
    res.status(200).json({
      message: "Employee deleted successfully",
    });
    const updateCarStatus = await Cars.updateOne(
      { car_id: carId },
      { $set: { status: "Not working" } },
      { new: true }
    );
    const updateEmpStatus = await EmployeeModel.updateOne(
      { emp_id: empId },
      { $set: { status: "InActive" } },
      { new: true }
    );
  } catch (error) {
    next(error);
  }
};
export const updateAssign = async (req, res, next) => {
  let updatedFields = {
    emp_id: req.body.emp_id,
    emp_name: req.body.emp_name,
    car_type: req.body.type,
    car_id: req.body.car_id,
    plateNo: req.body.plateNo,
    registeredDate: req.body.registeredDate,
  };

  try {
    console.log(req.params.id);
    const data = await AssingCar.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      {
        new: true,
      }
    );
    if (!data) return res.status(400).send("Assign not found");
    res.status(200).json({
      message: "updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
