import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import "../../assets/css/customScrollbar.css";
import postSvc from "../homePage/homeService";
import CommentForm from "../../components/commentForm";
import userSvc from "../profilePage/userService";
import EditPostPopup from "../../components/post/editPost/EditPostPopup";
import CommentComponent from "../../components/comment";

export default function PostCard() {
  const { postId } = useParams();
  const [postDetails, setPostDetails] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [postTime, setPostTime] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [commentMode, setCommentMode] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [editPostPopupOpen, setEditPostPopupOpen] = useState(false);

  function toggleCommentMode() {
    setCommentMode((prevMode) => !prevMode);
  }

  const handleLikeClicked = async () => {
    try {
      if (!isLiked) {
        await postSvc.addLike({
          postId: postDetails?._id,
          userId: userDetails?._id,
        });
        setIsLiked(true);
        setLikes([...likes,{postId:postDetails?._id, userId: userDetails?._id}]);
      } else {
        await postSvc.unlike(postDetails?._id, userDetails?._id);
        setIsLiked(false);
        setLikes((prevLikes)=> prevLikes.filter((like) => like.userId !== userDetails?._id));
      }
    } catch (error) {
      toast.error("Error liking post ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("persist:auth"))?.user;
        const userObject = JSON.parse(user);
        setUserDetails(userObject);

        const postData = (await postSvc.getPostById(postId))?.data?.result;
        setPostDetails(postData);

        const cmts = (await postSvc.commentsForPost(postId))?.data
          ?.result;
        setComments(cmts);

        const lks = (await postSvc.likesForPost(postId))?.data?.result;
        setLikes(lks);

        const isLiked = (
          await postSvc.isLikedByUser(postId, userObject._id)
        )?.data?.result;
        if (isLiked) {
          setIsLiked(true);
        }
      } catch (error) {
        console.log("Error : ", error);
      }
    };

    fetchData();
  }, [postId]);

  useEffect(() => {
    function timeAgo(createdDate) {
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
        return minutes === 1
          ? `${minutes} minute ago`
          : `${minutes} minutes ago`;
      } else {
        return "Just now";
      }
    }

    const createdDate = postDetails?.createdAt;
    const timeAgoString = timeAgo(createdDate);
    setPostTime(timeAgoString);
  }, [postDetails]);

  const handleMenuToggle = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  const handleEditPost = () => {
    setEditPostPopupOpen(true);
  };

  const handleDeletePost = async () => {
    try {
      await postSvc.deletePost(postDetails?._id);
      toast.info("Post deleted successfully!");
      window.location.reload();
    } catch (error) {
      toast.error("Error deleting post ", error);
    }
  };

  const handleFollowUnfollow = async (userId) => {
    try {
      const response = await userSvc.addRemoveFollowing(userId);
      console.log("Follow/unfollow response: ", response);
      toast.info(`Follow/Unfollow successfull!`);
      window.location.reload();
    } catch (error) {
      console.log("Error unfollowing user:", error);
      toast.error(`Error unfollowing user: ${error}`);
    }
  };

  const addComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  if (!postDetails || !userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 h-auto flex items-center justify-center w-full mt-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-4/5 md:w-2/3">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 ">
            <Link to={`${postDetails?.user}`}>
              <img
                src={`${import.meta.env.VITE_API_URL}images/user/${
                  postDetails?.userPicturePath
                }`}
                alt="User Avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
            </Link>
            <div>
              <Link to={`${postDetails?.user}`}>
                <p className="text-gray-800 font-semibold">{`${postDetails?.firstname} ${postDetails?.lastname}`}</p>
              </Link>
              <p className="text-gray-500 text-sm">{postTime}</p>
            </div>
          </div>

          <div className="text-gray-500 cursor-pointer relative">
            <button
              onClick={handleMenuToggle}
              className="hover:bg-gray-50 rounded-full p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="7" r="1" />
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="17" r="1" />
              </svg>
            </button>
            {showMenu && (
              <div className="absolute bg-white shadow-md rounded-md py-2 w-48 right-0 top-full mt-2">
                {postDetails?.user === userDetails?._id ? (
                  <>
                    <button
                      onClick={handleEditPost}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleDeletePost}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleFollowUnfollow(postDetails?.user)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      {userDetails.following.includes(postDetails?.user)
                        ? `Unfollow ${postDetails?.firstname}`
                        : "Follow"}
                    </button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                      Save Post
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="mb-4">
          <p className="text-gray-800">{postDetails?.caption}</p>
        </div>
        <div className="mb-4 mx-auto w-[100%] sm:w-4/5 h-[40vh] sm:h-[60vh] flex justify-center items-center">
          <img
            src={`${import.meta.env.VITE_API_URL}images/posts/${
              postDetails?.picturePath
            }`}
            alt="Post Image"
            className="max-w-full min-h-full min-w-[100%] max-h-full object-contain"
          />
        </div>
        <div className="flex items-center justify-between text-gray-500 ">
          <div
            className={`flex items-center space-x-2  `}
            onClick={handleLikeClicked}
          >
            <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
              <svg
                className={`w-5 h-5 fill-current ${
                  isLiked ? "text-red-500" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C6.11 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-4.11 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>{`${likes.length} likes`}</span>
            </button>
          </div>

          <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
            <svg
              width="22px"
              height="22px"
              viewBox="0 0 24 24"
              className="w-5 h-5 fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Comment icon */}
            </svg>
            <span>{`${comments.length} comment`}</span>
          </button>
        </div>
        <hr className="mt-2 mb-2" />
        <div className="flex items-center space-x-2">
          <button
            onClick={handleLikeClicked}
            className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1"
          >
            <svg
              className={`w-5 h-5 fill-current ${
                isLiked ? "text-red-500" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C6.11 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-4.11 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>{`${likes.length} likes`}</span>
          </button>
        </div>
        {commentMode ? (
          <CommentForm
            userId={userDetails?._id}
            postId={postDetails?._id}
            addComment={addComment}
          />
        ) : (
          <p
            className="text-gray-800 font-semibold"
            onClick={toggleCommentMode}
          >
            Comment
          </p>
        )}
        <hr className="mt-2 mb-2" />
        <div className="mt-4 h-40 overflow-auto custom-scrollbar">
          {comments &&
            comments.map((comment) => (
              <CommentComponent
                key={comment?.createdAt}
                comment={comment}
                postDetails={postDetails}
                userDetails={userDetails}
                setComments={setComments}
              />
            ))}
        </div>
        {editPostPopupOpen && (
          <EditPostPopup
            user={userDetails}
            postDetails={postDetails}
            closeEditPostPopup={() => setEditPostPopupOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
