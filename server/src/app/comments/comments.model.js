const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  text: { type: String, required: true },
},{
    timestamps:true,
    autoCreate:true
});

const CommentModel = mongoose.model('Comment', commentSchema);

module.exports = CommentModel;
