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
const fetchuser=require("../middleware/fetchuser")
const JWT_SECRET= "i am batman"

// Adding user using post method
router.post("/createuser",[
    body('name').isLength({min:4}),
    body('email').isEmail(),
    body('password').isLength({min:5})
],async (req,res)=>{
    let success=false;
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
        sucess=true
        res.json({sucess,authtoken})
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
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success=false;
            return res.status(400).json({ error: "No such user found" });
            
        }
        const comparepassword = await bcrypt.compare(password, user.password);
        if (!comparepassword) {
            success=false
            return res.status(400).json({ error: "Login with correct credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        success=true;
        return res.json({ success,authtoken });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Server Error");
    }
});


// get login user
router.post('/getuser',fetchuser,async(req,res)=>{
    try{
        userId="req.user.id"
        const user= await User.findById(req.user.id).select("-password");
        res.send(user);
        // res.json(user);
    }catch(err){
        console.log(err.message);
        res.status(500).json("Server Error")
    }
    
})

// update the password
router.post(
    '/updatepassword',
    fetchuser, 
    [
        body('oldPassword', 'Old password is required').exists(),
        body('newPassword', 'New password must be at least 5 characters long').isLength({ min: 5 }),
    ],
    async (req, res) => {
        let success = false;

        // Validate request input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Destructure and ensure correct naming and casing
        const { oldPassword, newPassword } = req.body; // Corrected variable names

        try {
            const userId = req.user.id; // Fetch user ID from JWT
            const user = await User.findById(userId); // Retrieve user from database
            
            if (!user) {
                return res.status(404).json({ success, error: "User not found" });
            }

            // Check if the old password matches the stored hashed password
            const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

            if (!isPasswordMatch) {
                return res.status(400).json({ success, error: "Old password is incorrect" });
            }

            // Hash and update the new password
            const salt = await bcrypt.genSalt(10);
            const hashedNewPassword = await bcrypt.hash(newPassword, salt);

            user.password = hashedNewPassword; // Update the user's password
            await user.save(); // Save the changes to the database

            success = true;
            res.json({ success, message: "Password updated successfully" }); 
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ success, error: "Server Error" });
        }
    }
);
module.exports=router;
