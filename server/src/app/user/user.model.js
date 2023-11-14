const mongoose = require('mongoose');

const userModelSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        min:2,
        max:50
    },
    lastname:{
        type:String,
        required:true,
        min:2,
        max:50
    },
    email:{
        type:String,
        required:true,
        max:50,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        min:5
    },
    picturePath:{
        type:String,
        default:""
    },
    friends:{
        type:Array,
        default:[]
    },
    location:String,
    occupation:String,
    viewedProfile:String,
    impressions:Number,
},{
    timestamps:true
})


const UserModel = mongoose.model("User",userModelSchema);

module.exports = UserModel;