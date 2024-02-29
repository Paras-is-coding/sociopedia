const mongoose = require('mongoose');

const userModelSchema = new mongoose.Schema({
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
    bio: { type: String },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    location:String,
    occupation:String,
    viewedProfile:String,
    impressions:Number,
    status:{
        type:String,
        enum:["active","inactive"],
        default:'inactive'
    },
    phone:String,
    token:String,
    resetToken:String,
    resetExpiry:Date
},{
    timestamps:true,
    autoCreate:true,
    autoIndex:true
})


const UserModel = mongoose.model("User",userModelSchema);

module.exports = UserModel;