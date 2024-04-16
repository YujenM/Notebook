const mangoose=require('mongoose');
const NotesSchema=new mangoose.Schema({
    user:{
        type:mangoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        require:true,
    },

    tag:{
        type:String,
        default:"Genral"
    },
    date:{
        type:Date,
        default: Date.now
    }
})

module.exports=mangoose.model('Notes',NotesSchema); 