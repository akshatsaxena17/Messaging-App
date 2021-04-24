const router=require('express').Router()
const User=require("../models/user")
const verify=require("./verifyToken")
router.get("/profile",verify,async(req,res)=>{
    const user=await User.findOne({_id:req.user._id})
    console.log(user)
    const userprofile={
        name:user.name,
        email:user.email,
        msg:"Profile Section"
    }
    res.render("../views/profile.ejs" ,{userprofile})
})
router.get("/genlink",verify,async(req,res)=>{
    const user=await User.findOne({_id:req.user._id})
    const link=`localhost:3000/api/addfriend/${user._id}`
    return res.send(link)
})
router.get("/addfriend/:id",verify,async(req,res)=>{
    const user=await User.findOne({_id:req.params.id})
    const me=await User.findOne({_id:req.user._id})
    user.friends.push(me._id);
    me.friends.push(user._id);
    user.save();
    me.save();
    res.send({user,me})
})


router.get("/friendlist",verify,async(req,res)=>{
    const user=await User.findOne({_id:req.user._id})
    let list=[];
    var object={
        friends:[]
    };
    console.log(user.friends);
    list=user.friends;
    object.friends.push("Bhosda");
    list.forEach(async(x)=>{
        const userx=await User.findOne({_id:x})
        object.friends.push(userx.name);
    })
    console.log(object.friends.length)
    res.send({object})
})
module.exports=router