const mongoose = require('mongoose');

const postModelSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    location:String,
    description:String,
    picturePath:String,
    userPicturePath:String,
    likes:{
        type:Map,
        of:Boolean,
    },
    comments:{
        type:Array,
        defaule:[],
    }
},
{
    timestamps:true
}
);


const PostModel = mongoose.model("Post",postModelSchema);
module.exports = PostModel; 