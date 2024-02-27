let Detail = require('../models/PictureUpload.model');
const moment = require('moment')
let {upload,deletePicture,getAllPictures,getPicturesByEmail,getProfilePicService,getCoverphotoservice}=require('../services/pictureUploadService')
const pictureUploadController = async(req,res,next)=>{
    if (!req.body && !req.files) {
      res.json({ success: false });
    } else {
      let c;
      Detail.findOne({}, (err, data) => {
  
        if (data) {
          c = data.unique_id + 1;
        } else {
          c = 1;
        }
        console.log(req.files,"req files")
        let detail = new Detail({
          
  
          // unique_id: c,
          email:req.body.email,
          username:req.body.username,
          caption: req.body.caption,
          type:req.body.type,
          image1: req.files[0] && req.files[0].filename ? req.files[0].filename : '',
          pictureUploadedDate:moment().format()
        });
  
        detail.save((err, Person) => {
          if (err)
            console.log(err);
          else{
          const resObj={
            message:"Image Uploaded Succesfully",
            status:"success"
          }
          return res.status(200).send(resObj);
        }
  
        });
  
      }).sort({ _id: -1 }).limit(1);
  
    }
  }

  const pictureDeleteController = async (req, res, next) => {
    const pictureDeleteService = await deletePicture(req.body,res);
    return res.json(pictureDeleteService);
  };

  const gellAllPicturesController = async(req,res,next)=>{
    const allPictures = await getAllPictures();
    return res.json(allPictures)
  }

  const getPicturesByEmailController = async(req,res,next)=>{
    const pictures = await getPicturesByEmail(req.body);
    return res.json(pictures)
  }
  const getProfilePictureController = async(req,res,next)=>{
    const profilepicture = await getProfilePicService(req.body);
    return res.json(profilepicture)
  }
  const getCoverphotoController = async(req,res,next)=>{
    const coverphoto  = await getCoverphotoservice(req.body);
    return res.json(coverphoto)
  }

  module.exports =  {pictureUploadController,pictureDeleteController,gellAllPicturesController,getPicturesByEmailController,getProfilePictureController,getCoverphotoController}