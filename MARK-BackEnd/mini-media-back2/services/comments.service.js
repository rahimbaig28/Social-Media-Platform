const Detail = require("../models/PictureUpload.model")
const moment = require('moment')
// adding comments by image
const addCommentsByImage = async(req,res)=>{
    // const com = await Detail.find({image1:req.image1})
    // const len = com[0].comments.length
    // console.log(len,"lennn")
    const rand = Math.floor((Math.random() * 10000000) + 1)
    const result = await Detail.updateOne({image1:req.image1 }, {
        $push:
        {
            "comments": [{
               email:req.email,
               username:req.username,
               comment:req.comment,
               commentedDate:moment().format(),
               commentId:rand
            }]
        }
    }).catch((err)=>{
        throw new Error(err)
    });
   
    if(result.nModified==0){
        return {status:"Failure",message:"Failed to add comment"}
    } else{
        const resp={
            status:"success",
            message:"Comment Added"
        }
        return resp
    }   
}

// get all comments by image

const getAllCommentsByImage = async(req,res)=>{
    const result = await Detail.find({image1:req.image1}).catch((err)=>{throw new Error(err)})
    // console.log(result[0].comments)
    if(result.length>0){
        let resp={
            status:"success",
            message:"comments exists",
            comments:result[0].comments,
            image:req.image1

        }
        return resp
    }else{
        let resp={
            status:"success",
            message:"no comments",
            comments:[]
        }
        return resp
    }
}

// delete comment by image and comment id

const deleteCommentByCommentId = async(req,res)=>{
    const result = await Detail.find({image1:req.image1}).catch((err)=>{throw new Error(err)})
    console.log(result,"result")
    if(result.length>0){
        if(result[0].email===req.email){
            const newComments = result[0].comments.filter((x)=>x.commentId!==req.commentId)
            console.log(newComments,"reamining")
            const newUpdated = await Detail.update({image1:req.image1},
                { $set: 
                    { comments: newComments}
                })
            if(newUpdated.nModified===1){
                let resp={
                    status:"success",
                    message:"Comment Deleted"
                }
                return resp
            }
        }
        else{
            const newModifiedComments=[]
            result[0].comments.map((x)=>{
                if(x.commentId!==req.commentId){
                    newModifiedComments.push(x)
                }
            })
            const newUpdated = await Detail.update({image1:req.image1},
                { $set: 
                    { comments: newModifiedComments}
                })
            if(newUpdated.nModified===1){
                let resp={
                    status:"success",
                    message:"Comment Deleted"
                }
                return resp
            }else{
                let resp={
                    status:"Failure",
                    message:"Failed to delete"
                }
                return resp
            }

        }
    }
    else{
        throw new Error("Comment Deletion Failed")
    }
}

module.exports={addCommentsByImage,getAllCommentsByImage,deleteCommentByCommentId}