const User = require("../models/User.model");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const deleteAccountService = async(request,response)=>{
    passwordEntered = request.password
    const originalPassword = await User.findOne({email:request.email})
    if(originalPassword===null){
        return {status:"failure",message:"Enter correct email"}
    }
    const checkP = await bcrypt.compare(passwordEntered, originalPassword.password)
    if(checkP){
        const resp = await delAcc();
        console.log(resp,"resp")
        return resp
    }else{
            resp={
                status:"Failure",
                message:"Enter correct password to delete your account"
            }
            console.log(resp,"resp")
    } 
    async function delAcc(){
        const deleteAcc = await User.deleteOne({email:request.email}).catch(e=>{throw new Error(e)})
        if(deleteAcc===null){
            console.log("came")
            let resp={
                status:"Failure",
                message:"email doesnot exists"
            }
            return resp
        }
        if(deleteAcc.deletedCount===1){
            // const deleteCommentsName = await Detail.find({email:request.email}).catch(e=>{throw new Error(e)})
            const deleteUserImages = await Detail.deleteMany({email:request.email}).catch(e=>{throw new Error(e)})
            const deleteCommentsName = await Detail.find({}).catch(e=>{throw new Error(e)})
            console.log(deleteCommentsName,"dname")
           
            
            for(let i=0;i<deleteCommentsName.length;i++){
                const imageId = deleteCommentsName[i].image1
                newComments = deleteCommentsName[i].comments
                newComments.map(y=>{
                    if(y.email===request.email){
                        y.email="['deleted']"
                        y.username="['deleted']"
                    }
                })
                const newUpdated = await Detail.update({image1:imageId},
                {
                $set: 
                    { comments: newComments}
                })
            }
            console.log("came1")
                let resp={
                    status:"success",
                    message:"Account Deleted Succesfully"
                }            
            return resp
        }else{
            console.log("camew2")
            resp={
                status:"failure",
                message:"Failed to delete"
            }
            return resp
        }
    }
} 

const accountDetailsService = async(req,res)=>{
    const email=req.email;
    const userDetails = await User.findOne({email:email})
    if(userDetails===null){
        return {status:"failure",message:"Enter correct email"}
    }else{
        let obj={
            status:"success",
            email:userDetails.email,
            username:userDetails.name
        }
        return obj
    }
}


module.exports = {deleteAccountService, accountDetailsService}