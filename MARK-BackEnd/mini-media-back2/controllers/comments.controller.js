const {addCommentsByImage,getAllCommentsByImage,deleteCommentByCommentId}=require("../services/comments.service")

const addCommentController = async(req,res,next)=>{
    const comments = await addCommentsByImage(req.body);
    return res.json(comments)
}

const getAllCommentsByImageController = async(req,res,next)=>{
    const comments = await getAllCommentsByImage(req.body);
    return res.json(comments)
}

const deleteCommentByCommentIdController = async(req,res,next)=>{
    const deleteComments = await deleteCommentByCommentId(req.body);
    return res.json(deleteComments)
}

module.exports={addCommentController,getAllCommentsByImageController,deleteCommentByCommentIdController}