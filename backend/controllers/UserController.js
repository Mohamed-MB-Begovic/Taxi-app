import Users from "../models/Usermodel.js";
// import jwt from "jsonwebtoken";
import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET } from "./../config/config.js";
import cloudinary from "../config/Cloudinary.js";

export const RegisterUser = async (req, res) => {
  try {
    const { Brandname, email, Password } = req.body;
    const isEmailExist = await Users.findOne({ Email: email.toLowerCase() });
    if (isEmailExist) {
      return res.status(404).send("email already exist please login");
    }

    const NewUser = new Users({
      Brandname: Brandname,
      Email: email,
      Password: Password,
    });

    await NewUser.save();
    res.status(201).send(NewUser);
    console.log(NewUser);
  } catch (error) {
    res.status(404).send(error);
    console.log("error  in register user " + error);
  }
};
export const AddUser = async (req, res) => {
  console.log(req.body);
  try {
    const { Brandname, Email, Password } = req.body;

    const isEmailExist = await Users.findOne({ Email: Email.toLowerCase() });
    if (isEmailExist) {
      return res.status(404).send("this email is already taken");
    }
    let result;
    let image;
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
      image = result.url;
    }
    const NewUser = new Users({
      Brandname: Brandname,
      Email: Email,
      Password: Password,
      image: image ? image : null,
    });

    await NewUser.save();
    res.status(201).send(NewUser);
    // console.log(NewUser);
  } catch (error) {
    res.status(404).send(error);
    console.log("error  in add user " + error);
  }
};
// export const UpdateRole = async (req, res, next) => {
//   console.log(req.body);
//   // let updatedFields = {
//   //   role:,
//   // };

//   // try {
//   //   const emp = await EmployeeModel.findByIdAndUpdate(
//   //     req.params.id,
//   //     updatedFields,
//   //     {
//   //       new: true,
//   //     } )
//   //   } catch (error) {
//   //       next(error);
//   //     }
// };
export const UpdateRole = async (req, res, next) => {
  console.log(req.body);
  let updatedFields = {
    role: req.body.value,
  };

  try {
    const user = await Users.findByIdAndUpdate(req.params.id, updatedFields, {
      new: true,
    });
    if (!user) return res.status(400).send("employee not found");
    console.log(user);
    res.status(200).json({
      message: "employee updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const EmailCheck = await Users.findOne({
      Email: email.toLowerCase(),
    }).select("Password Brandname role image Email");
    if (!EmailCheck) {
      return res.status(400).send("invalid email");
    }
    console.log(EmailCheck);
    const passCheck = EmailCheck.Password === password;
    if (!passCheck) {
      return res.status(400).send("invalid password");
    }
    ``;
    // token
    const expiresIn = 7 * 24 * 60 * 60;

    const token = jsonwebtoken.sign({ _id: EmailCheck._id }, JWT_SECRET, {
      expiresIn,
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: expiresIn * 1000,
    });

    res.status(200).send({ ...EmailCheck.toJSON(), expiresIn });
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
};

export const getUsers = async (req, res) => {
  // console.log(req.user);

  try {
    // const users = await Users.find({ _id: { $ne: req.user._id } });
    const users = await Users.find({ role: "user" });
    res.status(201).send(users);
  } catch (error) {
    console.log(error);
    console.log("error in getUsers");
  }
};
export const getAdmins = async (req, res) => {
  // console.log(req.user);

  try {
    // const users = await Users.find({ _id: { $ne: req.user._id } });
    const admins = await Users.find({ role: "admin" });
    res.status(201).send(admins);
  } catch (error) {
    console.log(error);
    console.log("error in getAdmins");
  }
};
export const TotalUsers = async (req, res) => {
  try {
    const totalusers = await Users.countDocuments({
      role: "user",
    });
    res.json(totalusers);
  } catch (error) {
    console.log("error in get total users  " + error);
    res.send(error);
  }
};
export const TotalAdmins = async (req, res) => {
  try {
    const totalAdmins = await Users.countDocuments({
      role: "admin",
    });
    res.json(totalAdmins);
  } catch (error) {
    console.log("error in get total admins  " + error);
    res.send(error);
  }
};
export const deleteAdmin = async (req, res, next) => {
  try {
    const admin = await Users.findByIdAndDelete(req.params.id);
    if (!admin) return res.status(400).send("admin not found");

    res.status(200).json({
      message: "admin deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    const user = await Users.findByIdAndDelete(req.params.id);
    if (!user) return res.status(400).send("user not found");

    res.status(200).json({
      message: "user deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const updateProfile = async (req, res, next) => {
  // console.log(req.body);
  console.log(req.body.image);
  const updatedFields = {};
  const email = req.body?.Email;
  if (email) {
    updatedFields.Email = email;
  }
  const brandname = req.body?.Brandname;
  if (brandname) {
    updatedFields.Brandname = brandname;
  }

  let result;
  if (req.file) {
    console.log("yes there is a file");
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

  try {
    const user = await Users.findByIdAndUpdate(req.params.id, updatedFields, {
      new: true,
    });
    if (!user) return res.status(400).send("user not found");
    const UserUpdated = await Users.findOne({
      _id: req.params.id,
    });
    // console.log(UserUpdated);
    res.status(200).send({ ...UserUpdated.toJSON() });
    // res.status(200).json({
    //   message: "user updated successfully",
    // });
  } catch (error) {
    next(error);
  }
};

export const updatePassword = async (req, res) => {
  const updatedFields = {
    Password: req.body.password,
  };
  try {
    const user = await Users.findByIdAndUpdate(req.params.id, updatedFields, {
      new: true,
    });
    if (!user) return res.status(400).send("user not found");
    // const UserUpdated = await Users.findOne({
    //   _id: req.params.id,
    // });
    // res.status(200).send({ ...UserUpdated.toJSON() });
  } catch (er) {
    console.log("error in update password" + er);
  }
};
