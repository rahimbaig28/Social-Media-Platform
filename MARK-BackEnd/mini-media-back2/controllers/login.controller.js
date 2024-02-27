const {
  signup,
  recoverPasswordReset,
  resetPassword,loginCheckService
} = require("../services/login.service");
const signUpController = async (req, res, next) => {
  const signupService = await signup(req.body);
  return res.json(signupService);
};

const resetPasswordRequestController = async (req, res, next) => {
  const recoverPasswordResetService = await recoverPasswordReset(
    req.body.email
  );
  return res.json(recoverPasswordResetService);
};

const resetPasswordController = async (req, res, next) => {
  const resetPasswordService = await resetPassword(
    req.body.userId,
    req.body.token,
    req.body.password
  );
  return res.json(resetPasswordService);
};

const loginController= async(req,res,next)=>{
  const loginCheck = await loginCheckService(req.body)
  return res.json(loginCheck)
}




module.exports = {
  signUpController,
  resetPasswordRequestController,
  resetPasswordController,
  loginController
};
