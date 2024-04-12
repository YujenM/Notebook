// creating authentcation for user
const express=require("express");
const router=express.Router();
// importing user schema from  model folder 
const User=require("../models/User");
//  import jwt to create token and verify it
const {body,validationResult}=require("express-validator");
// importing bcrypt
const bcrypt = require('bcryptjs');
const jwt=require("jsonwebtoken")

const JWT_SECRET= "i am batman"

// Adding user using post method
router.post("/createuser",[
    body('name').isLength({min:4}),
    body('email').isEmail(),
    body('password').isLength({min:5})
],async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            error:errors.array()
        })
    }
    try{
        //  check if the email is already exist or not
        let user= await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({error:"Email already exists"});
        }
        const salt= await bcrypt.genSalt(10);
        const securedpassword= await bcrypt.hash(req.body.password,salt);
        user= await User.create({
            name:req.body.name,
            email: req.body.email,
            password:securedpassword,
        })
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data,JWT_SECRET)
        
        res.json({authtoken})
    }catch(err){
        console.log("err: "+err.message)
        res.status(500).send("Error occured")
    }
})


// Authenticate a user to login
router.post('/login', [
    body('email', "Enter a valid email").isEmail(),
    body('password', 'Password must be at least 5 characters').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "No such user found" });
        }
        const comparepassword = await bcrypt.compare(password, user.password);
        if (!comparepassword) {
            return res.status(400).json({ error: "Login with correct credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        return res.json({ authtoken });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Server Error");
    }
});
module.exports=router;
