const express = require("express");
const { UserModel } = require("../model/user.model")
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

// register

userRouter.post("/register",async(req,res)=>{
    const { name,email,gender,password} = req.body;
try {
    bcrypt.hash(password, 5, async(err, hash)=> {
    
    const new_user = new UserModel({ name,email,gender,password:hash});
    await new_user.save();
});
    res.status(200).send({"msg":"User registered successfully"});
} catch (err) {
    res.status(400).send({"err":err.message})
}
})

// login

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
try {
    const user =await UserModel.findOne({email});
    if(user){
        const token = jwt.sign({ postId:user._id }, 'eval-4');
        bcrypt.compare(password, user.password, (err, result)=> {
            if(result){
                res.status(200).send({"msg":"Login Sucessfull","token":token});
            }else{
                res.status(200).send({"msg":"Wrong credentials"});
            }
        });
    }else{
        res.status(200).send({"msg":"Email not found"})
    }
} catch (err) {
    res.status(400).send({"err":err.message});
}
})

module.exports = {
    userRouter
}