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
const User=mangoose.model('User',UserSchema);
User.createIndexes;
module.exports=User;