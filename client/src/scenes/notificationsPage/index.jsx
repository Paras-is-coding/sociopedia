import React, { useEffect, useState } from "react";
import notificationsSvc from "./notificationsService";
import { toast } from "react-toastify";
import { HiDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

// socket integration
import { io } from "socket.io-client";


export default function NotificationsPage() {
  const navigate = useNavigate();
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
  const [notifications, setNotifications] = useState([]);

  const [optionsMenuOpen, setOptionsMenuOpen] = useState(null);

  // Fetch notifications on component mount
  useEffect(() => {
    fetchNotifications();

    // socket integration...
    // Establish WebSocket connection
    const socket = io(import.meta.env.WEBSOCKET_URL); // server URL

    socket.on('connect', () => {
      console.log('WebSocket connection established');
    });
    // Listen for new notifications
    socket.on('new-notification', (notification) => {
      console.log(notification)
      // Update notifications list with the new notification
      setNotifications((prevNotifications) => [notification, ...prevNotifications]);
      
    //...
    });

     // Clean up socket connection when component unmounts
     return () => {
      socket.disconnect();
    };

  }, []);

  const timeAgo = (createdDate) => {
    const currentDate = new Date();
    const postDate = new Date(createdDate);
    const timeDifference = currentDate - postDate;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return days === 1 ? `${days} day ago` : `${days} days ago`;
    } else if (hours > 0) {
      return hours === 1 ? `${hours} hour ago` : `${hours} hours ago`;
    } else if (minutes > 0) {
      return minutes === 1 ? `${minutes} minute ago` : `${minutes} minutes ago`;
    } else {
      return "Just now";
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await notificationsSvc.fetchNotifications();
      console.log(response);
      const newNotifications = response.result.map((element) => ({
        id: element.notification._id,
        isRead: element.notification.isRead,
        allDetails: element.notification,
        message: element.textMessage,
        timestamp: timeAgo(element.notification.createdAt),
        user: {
          name: element.notification.type === "post" ? "" : element.name,
          profileImage: element.picturePath,
        },
      }));

      setNotifications(newNotifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const markNotificationAsReadUnread = async (notificationId) => {
    try {
      const res = await notificationsSvc.markNotificationAsReadUnread(notificationId);
      // After marking as read, update notifications list
      fetchNotifications();
      toast.success(res.message);
    } catch (error) {
      toast.error(error.message);
      console.error("Error marking notification as read:", error);
    }
  };
  const markNotificationAsRead = async (notificationId) => {
    try {
      const res = await notificationsSvc.markNotificationAsRead(notificationId);
      // After marking as read, update notifications list
      fetchNotifications();
    } catch (error) {
      toast.error(error.message);
      console.error("Error marking notification as read:", error);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      const res = await notificationsSvc.deleteNotification(notificationId);
      // After deleting, update notifications list
      fetchNotifications();
      toast.success(res.message);
    } catch (error) {
      toast.error(error.message);
      console.error("Error deleting notification:", error);
    }
  };
  // Function to toggle options menu
  const toggleOptionsMenu = (notificationId) => {
    setOptionsMenuOpen((prevOpen) =>
      prevOpen === notificationId ? null : notificationId
    );
  };

  const handleNotificationClick = (notification) => {
    console.log(notification.allDetails);
    markNotificationAsRead(notification.id);
    // Example: Navigate to the post detail page if the notification is related to a post
    if (
      notification.allDetails.type === "post" ||
      notification.allDetails.type === "comment" ||
      notification.allDetails.type === "like"
    ) {
      navigate(`/home/post/${notification.allDetails.postId}`);
    }
    if (notification.allDetails.type === "follow") {
      navigate(`/home/profile/${notification.allDetails.sender}`);
    }
  };


  useEffect(() => {
    // Calculate the count of unread notifications
    const count = notifications.filter(notification => !notification.isRead).length;
    setUnreadNotificationsCount(count);
  }, [notifications]);


  return (
    <div className="container mx-auto w-5/6 md:w-2/3 px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold mr-4">Notifications</h2>
          <span className="bg-red-500 text-white font-semibold px-2 py-1 rounded-full">
            {unreadNotificationsCount}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`${
              notification.isRead ? "bg-gray-100" : "bg-gray-200"
            } rounded-lg p-4 flex items-center justify-between`}
            onClick={() => handleNotificationClick(notification)}
          >
            <div className="flex items-center">
              <img
                src={`${import.meta.env.VITE_API_URL}images/user/${
                  notification.user.profileImage
                }`}
                alt={notification.user.name}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div>
                <p className="text-base font-semibold">
                  {notification.user.name}
                </p>
                <p className="text-sm text-gray-500">{notification.message}</p>
                <span className="text-xs text-gray-400">
                  {notification.timestamp}
                </span>
              </div>
            </div>
            <div className="relative">
              <button

                className="text-gray-600 focus:outline-none h-8 w-4 bg-gray-200 hover:bg-gray-400 rounded-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleOptionsMenu(notification.id);
                }}
              >
                <HiDotsVertical />
              </button>
              {/* Options menu */}
              {optionsMenuOpen === notification.id && (
                <div className="absolute top-0 right-0 mt-6 w-48 bg-white border rounded-lg shadow-lg">
                  <ul className="py-1">
                    <li>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={(e) =>{
                          e.stopPropagation();
                           markNotificationAsReadUnread(notification.id)}
                        }
                      >
                        {
                          notification.isRead === true ?"Mark as Unread":"Mark as Read"
                        }
                        
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={(e) =>{
                          e.stopPropagation();
                         deleteNotification(notification.id)}
                        }
                      >
                        Delete
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
