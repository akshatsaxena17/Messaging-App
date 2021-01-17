const jwt=require('jsonwebtoken')

module.exports=function(req,res,next){
    const token=req.cookies.token
    if(!token){
        return res.status(400).send("Access Denied")
    }

    try{
        const verify=jwt.verify(token,process.env.secret)
        req.user=verify
        next()
    }catch(err){
        res.status(400).send(err)
    }
}

