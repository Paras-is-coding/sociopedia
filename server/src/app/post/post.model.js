const mongoose = require('mongoose');

const postModelSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    caption: { type: String },
    picturePath:String,
    location:String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
},
{
    timestamps:true,
    autoCreate:true
}
);


const PostModel = mongoose.model("Post",postModelSchema);
module.exports = PostModel; 