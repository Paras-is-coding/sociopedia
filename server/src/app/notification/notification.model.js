const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['like', 'comment', 'follow', 'post'],
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
  likeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Like',
  },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  },
  isRead: {
    type: Boolean,
    default: false,
  }
},{
  timestamps:true,
  autoCreate:true,
  autoIndex:true,
});

const NotificationModel = mongoose.model('Notification', notificationSchema);

module.exports = NotificationModel;
