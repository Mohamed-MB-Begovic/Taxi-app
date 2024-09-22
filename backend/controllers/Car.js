import Cars from "../models/CarModel.js";
import AssingCar from "../models/Assigncar.js";
import EmployeeModel from "../models/Employeemodel.js";

export const carRegister = async (req, res) => {
  const { type, plateNo, amount } = req.body;
  // const iscarExist = Cars.findOne({ plateNo: plateNo });
  // if (!iscarExist) return res.status(400).send("this car already exist");
  try {
    const currentUser = req.user._id;

    const NewCar = new Cars({
      type: type,
      plateNo: plateNo,
      // registeredDate: registeredDate,
      amount: amount,
      user: currentUser,
      status: "Not working",
    });

    await NewCar.save();
    res.status(201).send(NewCar);
    // console.log(NewCar);
    // console.log(currentUser);
  } catch (error) {
    console.log("error in register car " + error);
    res.status(400).send(error.message);
  }
};

export const TotalCar = async (req, res) => {
  try {
    // console.log("total car");
    const totalCar = await Cars.countDocuments({ user: req.user._id });
    // console.log("total  cars " + totalCar);
    res.json(totalCar);
    // console.log("totalCar:", totalCar);
  } catch (error) {
    console.log("error in total Cars data " + error);
  }
};
export const getCar = async (req, res) => {
  // console.log(req);
  try {
    // console.log("get car");
    const Car = await Cars.find({ user: req.user._id })
      .populate({ path: "user", model: "userModel" })
      .sort({
        createdAt: 1,
      });
    res.status(201).send(Car);
    // console.log("employees:", employees);
  } catch (error) {
    console.log("error in get Cars data " + error);
  }
};

export const deleteCar = async (req, res, next) => {
  try {
    const car = await Cars.findByIdAndDelete(req.params.car_id);
    if (!car) return res.status(400).send("car not found");
    const CarId = car.car_id;
    const findEmp = await AssingCar.find({ car_id: CarId });
    const empID = findEmp[0].emp_id;
    // console.log(empID);
    const updateCarStatus = await EmployeeModel.updateOne(
      { emp_id: empID },
      { $set: { status: "InActive" } },
      { new: true }
    );

    const delemp = await AssingCar.deleteOne({ car_id: car.car_id });

    res.status(200).json({
      message: "car deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const updateCar = async (req, res, next) => {
  let updatedFields = {
    type: req.body.type,
    plateNo: req.body.plateNo,
    registeredDate: req.body.registeredDate,
    amount: req.body.amount,
  };

  try {
    const currentUser = req.user._id;

    const car = await Cars.findByIdAndUpdate(req.params.car_id, updatedFields, {
      new: true,
    });
    if (!car) return res.status(400).send("car not found");
    res.status(200).json({
      message: "car updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const updateCarStatus = async (req, res, next) => {
  let updatedFields = {
    status: "working",
  };

  try {
    const data = await Cars.findByIdAndUpdate(req.params.id, updatedFields, {
      new: true,
    });
    // if (!emp) return res.status(400).send("employee not found");
    // res.status(200).json({
    //   message: "employee updated successfully",
    // });
  } catch (error) {
    next(error);
  }
};
export const idleCar = async (req, res) => {
  try {
    // console.log("idle employee happend");
    const response = await Cars.find(
      { user: req.user._id, status: "Not working" }
      // $and: [({ user: req.user._id }, { status: "InActive" })],
    );
    // console.log(response);
    res.status(201).send(response);
  } catch (error) {
    console.log("error in idle car controller" + error);
  }
};
export const findCar = async (req, res) => {
  // console.log(req.params.id);
  try {
    const response = await Cars.find({
      user: req.user._id,
      car_id: req.params.id,
    });
    // console.log("response kjkjk" + response);
    res.status(201).send(response);
  } catch (error) {
    console.log("error in find car " + error);
  }
};
