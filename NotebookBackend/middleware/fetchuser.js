const jwt=require("jsonwebtoken")
const JWT_SECRET= "i am batman"
const fetchusers=(req,res,next)=>{
    // get the user from the jwt token and add id to req object
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate using a valid token"});
    }
    try{
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next()
    }catch(err){
        console.log(err.message);
        req.status(500).json("internal server error");
    }
    
}

module.exports=fetchusers;