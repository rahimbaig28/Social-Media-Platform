const User = require("../models/User.model");

let multer = require('multer');
path = require('path');
let fs = require('fs');
var express = require('express');
const UserModel = require('../models/User.model');
var app = express();
let dir = './uploads';
let upload = multer({
    storage: multer.diskStorage({
  
      destination: (req, file, callback) => {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
        callback(null, './uploads');
      },
      filename: (req, file, callback) => { callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); }
  
    }),
  
    fileFilter: (req, file, callback) => {
      let ext = path.extname(file.originalname)
      if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        return callback(/*res.end('Only images are allowed')*/ null, false)
      }
      callback(null, true)
    }
  });

  const deletePicture = async (req,res) => {
   const exists = await Detail.findOne({image1:req.image1}).catch((err)=>{
    throw new Error(err)
});
  
   if(!exists){
    throw new Error("Image Does not Exists", 422);
   }else{
    await Detail.deleteOne({image1:req.image1}, (err, data) => { 
        fs.unlinkSync(`./uploads/${req.image1}`);   
      })  
   }
   const resp={
     "status":"success",
     "message":"Picture deleted succesfully"
   }
   return resp
  };

  // get all pictures

  const getAllPictures = async(req,res)=>{
    // app.use(express.static('uploads'));
    const data = await Detail.find({},(err,data)=>{
      if(err){
        let obj={
          status:"failure",
          message:"No images found"
        }
        return obj
      }
    }).catch((err)=>{
      let obj={
        status:"failure",
        message:"No images found"
      }
      return obj
  });
    if(data.length<=0){
      let obj={
        status:"failure",
        message:"No images found"
      }
      return obj
    }else{
      const details=[]
      data.sort(function(a,b){
        // console.log(a,b,"abbbb")
        return new Date(b.pictureUploadedDate) - new Date(a.pictureUploadedDate);
      });
      for(let i=0;i<data.length;i++){
        const usernamedetails=await User.findOne({email:data[i].email})
        // details[i].push(data[i],{"username":usernamedetails.name})
        data[i]=[data[i],{"username":usernamedetails.name}]
      }
     
      let res={
        status:"success",
        data:data
      }
      return res
    }
  }

  // get pictures based on email

  const getPicturesByEmail = async(req,res)=>{
    const data = await Detail.find({email:req.email},(err,data)=>{
      if(err){
        throw new Error("No Pictures Found",422)
      }
    }).catch((err)=>{
      throw new Error(err)
  });
    if(data.length<=0){
      throw new Error("No Pictures Found", 422);
    }else{
      data.sort(function(a,b){
        // console.log(a,b,"abbbb")
        return new Date(b.pictureUploadedDate) - new Date(a.pictureUploadedDate);
      });
      // let dummyData = []
      // for(let i=data.length-1;i>=0;i--){
      //   dummyData.push(data[i])
      // }
      // console.log(dummyData,"data")
      let res={
        status:"success",
        data:data
      }
      return res
    }
  }

  //get lastest uploaded profile picture

  const getProfilePicService = async(req,res)=>{
    const data = await Detail.find({email:req.email})
    if(data.length<=0){
      return {status:"failure",message:"No picture Uploaded yet"}
    }else{
      const arr = data.filter(x=>x.type==='profilepicture')
      if(arr.length<=0){
        return {status:"failure",message:"No profile photo Uploaded yet"}
      }
      arr.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
   });
      const result = arr[arr.length-1]
      let obj={
        status:"success",
        imagePath:result.image1,
        uploadedData:result.pictureUploadedDate
      }
      return obj
    }
  }

  //get lastest uploaded cover picture

  const getCoverphotoservice = async(req,res)=>{
    const data = await Detail.find({email:req.email})
    if(data.length<=0){
      return {status:"failure",message:"No picture Uploaded yet"}
    }else{
      const arr = data.filter(x=>x.type==='coverphoto')
      if(arr.length<=0){
        return {status:"failure",message:"No cover photo Uploaded yet"}
      }
      arr.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
      });
      const result = arr[arr.length-1]
      let obj={
        status:"success",
        imagePath:result.image1,
        uploadedData:result.pictureUploadedDate
      }
      return obj
    }
  }
module.exports={upload,deletePicture,getAllPictures,getPicturesByEmail,getProfilePicService,getCoverphotoservice}