const router=require('express').Router()
const User=require("../models/user")
const verify=require("./verifyToken")
router.get("/profile",verify,async(req,res)=>{
    const user=await User.findOne({_id:req.user._id})
    console.log(user)
    const userprofile={
        name:user.name,
        email:user.email,
        msg:"tmkc"
    }
    res.render("../views/profile.ejs" ,{userprofile})
})
router.get("/genlink",verify,async(req,res)=>{
    const user=await User.findOne({_id:req.user._id})
    const link=`${process.env.base_url}/addfriend/${user._id}`
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
const list=[]
router.get("/friendlist",verify,async(req,res)=>{
    const user=await User.findOne({_id:req.user._id})
    
    user.friends.forEach(async function (friend){
        const user=await User.findOne({_id:friend})
        list.push(user.name)
        console.log(list[list.length-1])
    })
    res.send({list})
})
module.exports=router