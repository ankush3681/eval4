const express = require("express");
const { PostModel } = require("../model/post.model");
const { auth } = require("../middleware/auth.middleware");


const postRouter = express.Router();

postRouter.use(auth);

// create

postRouter.post("/add", async (req,res)=>{
try {
    const post = new PostModel(req.body);
    await post.save();
    res.status(200).send({"msg":"Post Added successfully"})

} catch (err) {
    res.status(400).send({"err":err.message});
}
})


// read


postRouter.get("/", async (req,res)=>{
  try {
     const post = await PostModel.find({postId:req.body.postId});
     res.status(200).send(post);
  } catch (err) {
    res.status(400).send({"err":err.message});
  }
})

// update

postRouter.patch("/update/:id", async (req,res)=>{
    const id = req.params.id;
    console.log(id)
    const post = await PostModel.findOne({_id:id});
    try {
        if(req.body.postId === post.postId){
            await PostModel.findByIdAndUpdate({_id:id},req.body);
            res.status(200).send({"msg":"post updated successfully"});
        }else{
            res.status(200).send({"msg":"You are not authorized to do this update"});
        }
    } catch (err) {
        res.status(400).send({"err":err.message});
    }

})


// delete

postRouter.delete("/delete/:id", async (req,res)=>{
    const id = req.params.id;
    const post = await PostModel.findOne({_id:id});
try {
    if(req.body.postId === post.postId){
        await PostModel.findByIdAndDelete({_id:id});
        res.status(200).send({"msg":"post deleted successfully"});
    }else{
        res.status(200).send({"msg":"You are not authorized to do this delete"});
    }
} catch (err) {
    res.status(400).send({"err":err.message});
}
})


module.exports = {
    postRouter
}