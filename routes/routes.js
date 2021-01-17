const router = require('express').Router();
const User = require('../models/user');
const joi = require('joi');
const bcrypt=require('bcryptjs')
const local=require('localStorage')
const jwt=require('jsonwebtoken')
const {registerValidation,loginValidation}=require('./validation')
router.post("/register",async (req,res)=>{
    const {error}=registerValidation(req.body);
    if(error){
        return res.send(error.details[0].message)
    }
    const existuser = await User.findOne({email:req.body.email})
    if(existuser){
        return res.status(400).send("email already exist");
    }

    const salt=await bcrypt.genSalt(10);
    const hashpass=await bcrypt.hash(req.body.password,salt);
    const user =new User({
        name:req.body.name,
        email:req.body.email,
        password:hashpass
    })
    try{
        const savedUser=await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
})
router.post("/login",async(req,res)=>{
    const {error}=loginValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    const existuser = await User.findOne({email:req.body.email})
    if(!existuser){
        return res.status(400).send("email doesn't exist");
    }

    const userpass=await bcrypt.compare(req.body.password,existuser.password)
    if(!userpass){
        return res.status(400).send("invalid password")
    }
    const token=jwt.sign({_id:existuser._id},process.env.secret)
    res.header('auth-token',token)
})
router.get("/",(req,res)=>{
    res.send("OK");
})

module.exports = router