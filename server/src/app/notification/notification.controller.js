const io = require("../../..");
const UserModel = require("../user/user.model");
const NotificationModel = require("./notification.model");

class NotificationsController {
  async createNotification(
    recipientId,
    senderId,
    type,
    postId = null,
    commentId = null,
    likeId = null
  ) {
    try {
      const notification = new NotificationModel({
        recipient: recipientId,
        sender: senderId,
        type: type,
        postId: postId,
        commentId: commentId,
        likeId: likeId,
      });
      await notification.save();

      // Fetch sender information
      const sender = await UserModel.findById(senderId);

      // Format the notification for emitting
      const formattedNotification = {
        notification: notification,
        name: `${sender.firstname} ${sender.lastname}`,
        picturePath: sender.picturePath,
        textMessage: "", // Leave message blank as it will depend on the notification type
      };

      // Assign appropriate message based on notification type
      switch (type) {
        case "like":
          formattedNotification.textMessage = `${sender.firstname} ${sender.lastname} liked your post.`;
          break;
        case "comment":
          formattedNotification.textMessage = `${sender.firstname} ${sender.lastname} commented on your post.`;
          break;
        case "follow":
          formattedNotification.textMessage = `${sender.firstname} ${sender.lastname} followed you.`;
          break;
        case "post":
          formattedNotification.textMessage = `Post created successfully!`;
          break;
        default:
          formattedNotification.textMessage = "New notification!";
      }

      // Emit the formatted notification through socket
      // io.emit("new-notification", formattedNotification);

      // Get the recipient's socket from the Map
      const recipientSocket = onlineUsers.get(recipientId);

      // Emit the formatted notification through socket to the recipient user
      if (recipientSocket) {
        io.to(recipientSocket).emit("new-notification", formattedNotification);
      }
    } catch (error) {
      throw error;
    }
  }

  // Controller method for fetching notifications
  async getNotifications(req, res, next) {
    try {
      const page = parseInt(req.query["page"]) || 1;
      const limit = parseInt(req.query["limit"]) || 15;
      const searchKeyword = req.query["search"] || "";
      const userId = req.authUser._id;

      let filter = { recipient: userId };

      // Apply search filter
      if (searchKeyword) {
        filter = {
          ...filter,
          $or: [
            { type: new RegExp(searchKeyword, "i") },
            // more fields here.......
          ],
        };
      }

      // Apply pagination
      const skip = (page - 1) * limit;

      // Fetch notifications from the database
      const notifications = await NotificationModel.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      // Fetch total count of notifications
      const totalCount = await NotificationModel.countDocuments(filter);

      //  Adding text message for each notification
      const formattedNotifications = await Promise.all(
        notifications.map(async (notification) => {
          const sender = await UserModel.findById(notification.sender);

          let textMessage = "";
          let name = sender.firstname + " " + sender.lastname;
          let picturePath = sender.picturePath;
          switch (notification.type) {
            case "like":
              textMessage = `${sender.firstname} ${sender.lastname} liked your post.`;
              break;
            case "comment":
              textMessage = `${sender.firstname} ${sender.lastname} commented on your post.`;
              break;
            case "follow":
              textMessage = `${sender.firstname} ${sender.lastname} followed you.`;
              break;
            case "post":
              textMessage = `Post created successfully!`;
              break;
            default:
              textMessage = "New notification!";
          }
          return { notification, name, picturePath, textMessage };
        })
      );

      res.json({
        result: formattedNotifications,
        message: "Notifications fetched successfully",
        meta: {
          total: totalCount,
          currentPage: page,
          limit: limit,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async markNotificationAsReadUnread(req, res, next) {
    try {
      const notificationId = req.params.id;
      const notification = await NotificationModel.findById(notificationId);
      if (!notification) {
        throw new Error("Notification not found");
      }
      notification.isRead = !notification.isRead;
      await notification.save();
      res.json({
        result: true,
        message: `Notification marked as ${
          notification.isRead ? "unread" : "read"
        }!`,
        meta: null,
      });
    } catch (error) {
      next(error);
    }
  }
  async markNotificationAsRead(req, res, next) {
    try {
      const notificationId = req.params.id;
      const notification = await NotificationModel.findById(notificationId);
      if (!notification) {
        throw new Error("Notification not found");
      }
      notification.isRead = true;
      await notification.save();
      res.json({
        result: true,
        message: `Notification marked as read!`,
        meta: null,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteNotification(req, res, next) {
    try {
      const notificationId = req.params.id;
      await NotificationModel.findByIdAndDelete(notificationId);
      res.json({
        result: true,
        message: "Notification deleted successfully",
        meta: null,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteNotificationUnfollow(senderId, recipientId, type) {
    try {
      await NotificationModel.deleteMany({
        sender: senderId,
        recipient: recipientId,
        type: type,
      });
      return {
        result: true,
        message: "Notifications deleted successfully",
        meta: null,
      };
    } catch (error) {
      throw error;
    }
  }
}

const notificationsCtrl = new NotificationsController();
module.exports = notificationsCtrl;
