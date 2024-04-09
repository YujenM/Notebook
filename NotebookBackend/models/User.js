const mangoose=require('mongoose');
const UserSchema=new mangoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default: Date.now
    },

})

module.exports=mangoose.model('User',UserSchema);