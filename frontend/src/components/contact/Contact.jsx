/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import "./contact.css";
import axios from 'axios'
export default function Contact() {
  const [name,setName]=useState()
  const [email,setEmail]=useState()
  const [phone,setPhone]=useState()
  const [message,setMessage]=useState()
  const  handleSubmit=async(e)=>{
    console.log('object')
    e.preventDefault();
    const formdata=new FormData();
    formdata.append('name',name)
    formdata.append('mobile',phone)
    formdata.append('email',email)
    formdata.append('message',message)
    const obj=Object.fromEntries(formdata.entries())
    console.log(obj)
    try {
const request=await axios.post('/api/request-contact',obj)
console.log(request)
    } catch (error) {
      console.log('error in contact request '+error)
    }
  }
  return (
    <div className="contact">
      <h2>Get In Touch</h2>
      <p>
        we will love to hear your digital transformation needs,let's get started
      </p>
      <div className="contact-content">
        <div className="left-contact">
          <div className="developers">
            <img src="./user.png" alt="" />
            <img src="./p-1.png" alt="" />
            <img src="./dev-2.jpg" alt="" />
          </div>
          <div className="message-content">
            <div className="content-one"></div>
            <div className="content-two"></div>
          </div>
        </div>
        <div className="right-contact">
          <input type="text" placeholder="Full name"value={name} required onChange={(e)=>setName(e.target.value)}/>
          <input type="number" placeholder="Mobile " value={phone} required onChange={(e)=>setPhone(e.target.value)}/>
          <input type="email" name="" id="" value={email} placeholder="Email ID" required onChange={(e)=>setEmail(e.target.value)}/>
          <textarea placeholder="message" required value={message} onChange={(e)=>setMessage(e.target.value)}></textarea >
          <button type="submit" className="btn btn-submit" onClick={handleSubmit}>
            submit
          </button>
        </div>
      </div>
    </div>
  );
}
