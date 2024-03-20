import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import postSvc from "../../../scenes/homePage/homeService";
import CommentComponent from "../../comment";
import CommentForm from "../../commentForm";
import { toast } from "react-toastify";
import "../../../assets/css/customScrollbar.css";
import EditPostPopup from "../editPost/EditPostPopup";

export default function PostCard({ postDetails, userDetails }) {
  const [postTime, setPostTime] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [commentMode, setCommentMode] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [editPostPopupOpen, setEditPostPopupOpen] = useState(false); // State to track whether the edit post popup is open

  function toggleCommentMode() {
    commentMode ? setCommentMode(false) : setCommentMode(true);
  }

  const handleLikeClicked = async () => {
    try {
      if (!isLiked) {
        await postSvc.addLike({
          postId: postDetails?._id,
          userId: userDetails?._id,
        });
      } else {
        await postSvc.unlike(postDetails?._id, userDetails?._id);
      }
      // Refresh the page after liking or unliking
      window.location.reload();
    } catch (error) {
      toast.error("Error liking post ", error);
    }
  };

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

  useEffect(() => {
    // console.log(postDetails);
    const fetchData = async () => {
      try {
        const cmts = (await postSvc.commentsForPost(postDetails?._id))?.data
          ?.result;
        setComments(cmts);

        const lks = (await postSvc.likesForPost(postDetails?._id))?.data
          ?.result;
        setLikes(lks);

        const isLiked = (
          await postSvc.isLikedByUser(postDetails?._id, userDetails?._id)
        )?.data?.result;
        if (isLiked) {
          setIsLiked(true);
        }
      } catch (error) {
        console.log("Error : ", error);
      }
    };

    fetchData();
  }, []);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
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

  return (
    <div className="bg-gray-100 h-auto flex items-center justify-center w-full">
      <div className="bg-white p-8 rounded-lg shadow-md w-4/5 md:w-2/3">
        {/* User Info with Three-Dot Menu */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 ">
            <Link
            to={`${postDetails?.user}`}
            >
            <img
              src={`${import.meta.env.VITE_API_URL}images/user/${
                postDetails?.userPicturePath
              }`}
              alt="User Avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
            </Link>
            <div>
            <Link
            to={`${postDetails?.user}`}
            >
              <p className="text-gray-800 font-semibold">{`${postDetails?.firstname} ${postDetails?.lastname}`}</p>
              </Link>
              <p className="text-gray-500 text-sm">{postTime}</p>
            </div>
          </div>

          <div className="text-gray-500 cursor-pointer relative">
            {/* Three-dot menu icon */}
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
            {/* Menu */}
            {showMenu && (
              <div className="absolute bg-white shadow-md rounded-md py-2 w-48 right-0 top-full mt-2">
                {postDetails?.user === userDetails?._id ? (
                  <>
                    <button
                    onClick={handleEditPost}
                     className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                      Edit
                    </button>
                    <button
                    onClick={handleDeletePost}
                     className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                      Delete
                    </button>
                  </>
                ) : (
                  <>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
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
        {/* Message */}
        <div className="mb-4">
          <p className="text-gray-800">{postDetails?.caption}</p>
        </div>
        {/* Image */}
        {/* <div className="mb-4 ">
          <img
            src={`${import.meta.env.VITE_API_URL}images/posts/${
              postDetails?.picturePath
            }`}
            alt="Post Image"
            className="w-auto mx-auto h-[50vh] object-fit rounded-md"
          />
        </div> */}
          {/* Image */}
          <div className="mb-4 mx-auto w-[100%] sm:w-4/5 h-[40vh] sm:h-[60vh] flex justify-center items-center">
  <img
    src={`${import.meta.env.VITE_API_URL}images/posts/${postDetails?.picturePath}`}
    alt="Post Image"
    className="max-w-full min-h-full min-w-[100%] max-h-full object-contain"
  />
</div>
        {/* Like and Comment Section */}
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
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22ZM8 13.25C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75H13.5C13.9142 14.75 14.25 14.4142 14.25 14C14.25 13.5858 13.9142 13.25 13.5 13.25H8ZM7.25 10.5C7.25 10.0858 7.58579 9.75 8 9.75H16C16.4142 9.75 16.75 10.0858 16.75 10.5C16.75 10.9142 16.4142 11.25 16 11.25H8C7.58579 11.25 7.25 10.9142 7.25 10.5Z"
                ></path>
              </g>
            </svg>
            <span>{`${comments.length} comment`}</span>
          </button>
        </div>
        <hr className="mt-2 mb-2" />
        {commentMode ? (
          <CommentForm userId={userDetails?._id} postId={postDetails?._id} />
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
              <CommentComponent key={comment?.createdAt} comment={comment} />
            ))}
        </div>

             {/* Edit Post Popup */}
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
