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
    res.json(userprofile)
})


module.exports=router