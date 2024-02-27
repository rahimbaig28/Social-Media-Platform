
const {deleteAccountService,accountDetailsService} = require("../services/account.service")
const deleteAccountController= async(req,res,next)=>{
    const deleteAccount = await deleteAccountService(req.body);
    console.log(deleteAccount,"da")
    return res.json(deleteAccount)
}

const getAccountDetailsController=async(req,res,next)=>{
    const accountDetails = await accountDetailsService(req.body);
    return res.json(accountDetails)
}

module.exports={deleteAccountController,getAccountDetailsController}