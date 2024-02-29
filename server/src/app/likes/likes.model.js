const mongoose = require('mongoose');

const likesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
});

const LikesModel = mongoose.model('Like', likesSchema);

module.exports = LikesModel;
