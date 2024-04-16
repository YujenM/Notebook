const express=require("express");
const router=express.Router();
const fetchuser=require("../middleware/fetchuser")
const Note =require('../models/Note')
const {body,validationResult}=require("express-validator");

// get notes of the User
router.get('/fetchallnotes',fetchuser, async (req,res)=>{
    try{
        const notes= await Note.find({user:req.user.id})
        res.json (notes)
    }catch(err){
        console.log(err.message);
        res.status(500).send("Internal Server Error")
    }
})

// add new notes
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 5 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title,
            description,
            tag,
            user: req.user.id
        });
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
});

//  update notes
router.put('/updatenode/:id',fetchuser,async (req,res)=>{
    const {title,description,tag}=req.body;
    // create a new note object
    const newnote={};
    if (title){
        newnote.title=title;
    };
    if (description){
        newnote.description=description;
    };
    if (tag){
        newnote.tag=tag;
    };
    try{
        // finding the note by id 
        let note= await Note.findById(req.params.id);
        // if note is not found giving status 401
        if(!note){
            return res.status(401).send("ID Not found")
        }
        // if note is found then checking the user id
        if (note.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed"); 
        }
        // updating the note
        note=await Note.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})
        res.json({note})
    }catch(err){
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router;