import mongoose from "mongoose";

const ContactModel=new mongoose.Schema({
    name:{
        type:String,
    },
    mobile:{
        type:Number
    },
    email:{
    type:String
    },
    message:{
        type:String
    }

})

const Contact=mongoose.model("ContactModel",ContactModel)
export default Contact;