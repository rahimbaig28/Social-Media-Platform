const JWT = require("jsonwebtoken");
const User = require("../models/User.model");
const Token = require("../models/Token.model");
const sendEmail = require("../utils/email/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const JWTSecret = process.env.JWT_SECRET;
const bcryptSalt = process.env.BCRYPT_SALT;
const clientURL = process.env.CLIENT_URL; 

const signup = async (data) => {
  // console.log(data,"data")
  let user = await User.findOne({ email: data.email });
  let username = await User.findOne({ name: data.name });
  if (user) {
    let res={
      status:'Failure',
      message:"Email already exist"
    }
    return res
    // throw new Error("Email already exist", 422);
  }
  if (username) {
    let res={
      status:'Failure',
      message:"Username already exist"
    }
    return res
    // throw new Error("Username already exist", 422);
  }
  user = new User(data);
  // console.log("uuu",user)
  const token = JWT.sign({ id: user._id }, JWTSecret);
  await user.save();
  const res={
    userId: user._id,
    email: user.email,
    name: user.name,
    token: token,
    message:"Registration Successful"
  }
  return res;
};

const recoverPasswordReset = async (email) => {
  const user = await User.findOne({ email:email });
  console.log(user,"iser")
  if (!user){
    let obj={
      status:"error",
      message:"Email does not exist"
    }
    return obj
  }

  let token = await Token.findOne({ userId: user._id });
  if (token) await token.deleteOne();

  let tokenReset = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(tokenReset, Number(bcryptSalt));

  await new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  }).save();

  const link = `${clientURL}/reset-password?token=${tokenReset}&id=${user._id}`;

  sendEmail(
    user.email,
    "Password Reset Request",
    {
      name: user.name,
      link: link,
    },
    "./template/requestResetPassword.handlebars"
  );
  let obj={
    status:"success",
    message:"Link Sent Succesfully"
  }
  return obj

};

const resetPassword = async (userId, token, password) => {
  console.log("user",userId)
  let passResetToken = await Token.findOne({ userId });

  if (!passResetToken) {
    let obj={
      status:"error",
      message:"No user exists/ Please try again"
    }
    return obj
  }

  const isValid = await bcrypt.compare(token, passResetToken.token);

  if (!isValid) {
    let obj={
      status:"error",
      message:"Invalid or expired password reset token, Please try again"
    }
    return obj

  }

  const hash = await bcrypt.hash(password, Number(bcryptSalt));

  await User.updateOne(
    { _id: userId },
    { $set: { password: hash } },
    { new: true }
  );

  const user = await User.findById({ _id: userId });

  // sendEmail(
  //   user.email,
  //   "Password Reset Successfully",
  //   {
  //     name: user.name,
  //   },
  //   "./template/resetPassword.handlebars"
  // );

  await passResetToken.deleteOne();
  const res={
    status:'success',
    message:"password changes succesfully"
  }
  return res;
};

const loginCheckService = async (req,res)=>{
  const email = req.email
  const password = req.password
  const data = await User.findOne({email:email})
  if(data==null){
    resp={
      status:"Failure",
      message:"Please Enter Correct Email"
    }
    return resp
  }
  console.log(data,"data")
  const result = await bcrypt.compare(password,data.password)
  console.log(result,"result")
  if(result){
    resp={
      status:"Success",
      message:"Login succesfull",
      data:{
        email:data.email,
        username:data.name
      }
    }
    return resp
  }else{
    resp={
      status:"Failure",
      message:"Please Enter Correct Password"
    }
    return resp
  }
}

module.exports = {
  signup,
  recoverPasswordReset,
  resetPassword,loginCheckService
};
