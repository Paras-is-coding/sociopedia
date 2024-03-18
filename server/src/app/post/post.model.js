const mongoose = require('mongoose');

const postModelSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    firstname:String,
    lastname:String,
    caption:String,
    picturePath:String,
    userPicturePath:String,
    location:String,
    // likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],default:[],
    // comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],default:[],
},
{
    timestamps:true,
    autoCreate:true
}
);


const PostModel = mongoose.model("Post",postModelSchema);
module.exports = PostModel; 