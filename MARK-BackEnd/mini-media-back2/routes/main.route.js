const {deleteAccountController, getAccountDetailsController} = require("../controllers/account.controller")
const {signUpController,loginController,resetPasswordRequestController,resetPasswordController} = require("../controllers/login.controller");
const {pictureUploadController,pictureDeleteController,gellAllPicturesController,getPicturesByEmailController,getProfilePictureController,getCoverphotoController} = require("../controllers/pictureUpload.controller")
const {upload,deletePicture} = require("../services/pictureUploadService")
const {addCommentController,getAllCommentsByImageController,deleteCommentByCommentIdController}=require("../controllers/comments.controller")
const router = require("express").Router();

// user registration, forgot, recover password
router.post("/auth/login",loginController)
router.post("/auth/signup", signUpController);
router.post("/auth/requestResetPassword", resetPasswordRequestController);
router.post("/auth/resetPassword", resetPasswordController);

// upload picture and delete picture
// router.post('/getUsernameByEmail',getUsernamebyEmailController)
router.post('/uploadpicture', upload.any(),pictureUploadController )
router.post('/deletepicture',pictureDeleteController)
router.get('/getAllPictures', gellAllPicturesController)
router.post('/getPicturesByEmail',getPicturesByEmailController)
router.post('/getProfilePicture',getProfilePictureController)
router.post('/getCoverPhoto',getCoverphotoController)

// comments
router.post('/addcomment',addCommentController)
router.post('/getAllCommentsByImage',getAllCommentsByImageController)
router.post('/deleteCommentByCommentId',deleteCommentByCommentIdController)

// delete account
router.post('/deleteAccount',deleteAccountController)

//get account details
router.post('/getAccountDetailsByEmail',getAccountDetailsController)

module.exports = router;
