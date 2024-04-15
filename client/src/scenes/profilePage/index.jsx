import React, { useEffect, useState } from "react";
import EditProfilePopupComponent from "../../components/profile/editProfilePopup";
import FollowersFollowingPopupComponent from "../../components/profile/FollowersFollowingPopupComponent";
import userSvc from "./userService";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import postSvc from "../homePage/homeService";

export default function ProfilePage() {
  const [user, setUser] = useState({});
  const [localUser, setLocalUser] = useState({});
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false); 
  const [isFollowersPopupOpen, setFollowersPopupOpen] = useState(false);
  const [isFollowingPopupOpen, setFollowingPopupOpen] = useState(false);
  const { userId } = useParams();
  const [userPosts,setUserPosts] = useState([]);

  // Function to open followers popup
  const openFollowersPopup = () => {
    setFollowersPopupOpen(true);
  };

  // Function to open following popup
  const openFollowingPopup = () => {
    setFollowingPopupOpen(true);
  };

  // Function to close any popup
  const closePopup = () => {
    console.log("triggered")
    setEditProfilePopupOpen(false);
    setFollowersPopupOpen(false);
    setFollowingPopupOpen(false);
  };

  useEffect(() => {
    const  luser = JSON.parse(localStorage.getItem("persist:auth"))?.user;
    const userObject = JSON.parse(luser);
    setLocalUser(userObject);
  }, []);

  const openEditProfilePopup = () => {
    setEditProfilePopupOpen(true);
  };

  const handleFollowUnfollow = async (userId,reqTo) => {
    try {
      const response = await userSvc.addRemoveFollowing(userId);
      console.log("Follow/unfollow response: ",response);
      toast.info(`${reqTo}ed successfully!`);
      window.location.reload();
    } catch (error) {
      console.log("Error unfollowing user:", error);
      toast.error(`Error unfollowing user: ${error}`);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log(userId);
        const response = await userSvc.getUser(userId);
        console.log(response);
        setUser(response?.data?.result?.user);

        const userPostsResponse = await postSvc.getUserPosts(userId); 
        console.log("up",userPostsResponse)
        const userPosts = userPostsResponse.data?.result?.userPosts; 
        setUserPosts(userPosts);
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <div className="max-w-2xl mx-auto min-h-screen max-h-fit  bg-gray-100">
      {/* Edit Profile Popup */}
      {isEditProfilePopupOpen && (
        <EditProfilePopupComponent
          user={user}
          closeEditProfilePopup={closePopup}
        />
      )}

      {/* Followers Popup */}
      {isFollowersPopupOpen && (
        <FollowersFollowingPopupComponent
          type="followers"
          user={user} // Assuming user id is needed to fetch followers
          closePopup={closePopup}
        />
      )}

      {/* Following Popup */}
      {isFollowingPopupOpen && (
        <FollowersFollowingPopupComponent
          type="following"
          user={user}
          closePopup={closePopup}
        />
      )}

      <div className="px-3 py-2 bg-gray-100">
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Profile Picture */}
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg">
              <img
                className="object-cover w-full h-full"
                src={
                  `${import.meta.env.VITE_API_URL}images/user/${
                    user?.picturePath
                  }` ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="Profile"
              />
            </div>
          </div>

          {/* User Information */}
          <div>
            <p className="text-xl font-semibold">{`${user?.firstname} ${user.lastname}`}</p>
            <p className="text-sm text-gray-400">{user?.bio}</p>
            <p className="text-sm text-gray-400">{user?.location}</p>
            <p className="text-sm text-gray-400">{`${user?.viewedProfile} profile views with ${user?.impressions} impressions.`}</p>
          </div>

          {/* Stats */}
          <div className="flex justify-center items-center gap-8">
            <div>
              <p className="text-lg font-semibold text-black">
                {user?.posts?.length}
              </p>
              <p className="text-sm text-gray-400">Posts</p>
            </div>
            <div onClick={openFollowersPopup} className="cursor-pointer">
              <p className="text-lg font-semibold text-black">
                {user?.followers?.length}
              </p>
              <p className="text-sm text-gray-400">Followers</p>
            </div>
            <div onClick={openFollowingPopup} className="cursor-pointer">
              <p className="text-lg font-semibold text-black">
                {user?.following?.length}
              </p>
              <p className="text-sm text-gray-400">Following</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2 my-5">
          {/* Check if the profile belongs to the current user */}
          {localUser._id === user._id ? (
            <button
              onClick={openEditProfilePopup}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-gray-400 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300 ease-in-out"
            >
              Edit Profile
            </button>
          ) : (
            // If not, show follow/unfollow button
            <>
              {user?.followers?.includes(localUser._id) ? (
                <button
                  onClick={() => handleFollowUnfollow(user?._id,"Unfollow")}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-gray-400 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300 ease-in-out"
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={() => handleFollowUnfollow(user?._id,"Follow")}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-blue-400 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
                >
                  Follow
                </button>
            
              )}
              <Link
              to={'/home/chats'}
              >
              <button
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-gray-400 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300 ease-in-out"
              >
                Message
              </button>
              </Link>
              
            </>
          )}

          {/* <button className="bg-pink-500 px-10 py-2 rounded-full text-white shadow-lg">Follow</button> */}
          {/* <button className="bg-white border border-gray-200 px-10 py-2 rounded-full shadow-lg">Message</button> */}
        </div>

        <div className="flex justify-between items-center">
          <button className="w-full py-2 border-b-2 border-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button className="w-full py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-3">
  {/* Render user posts */}
  {userPosts.map((post) => (
    <div key={post?._id} className=" aspect-w-1 aspect-h-1">
      <Link to={`/home/post/${post?._id}`}>
      <div className="w-full h-full">
        <img
          className="w-full h-full object-cover rounded-lg border border-gray-200"
          src={`${import.meta.env.VITE_API_URL}images/posts/${post?.picturePath}`}
          alt="Post"
        />
      </div>
      </Link>
     
    </div>
  ))}
</div>




      </div>

      {/* <div className="flex justify-between items-center bg-gray-600 bg-opacity-20 px-10 py-5 rounded-full text-gray-500">
        <button className="p-2 rounded-full bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-slate-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </button>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
        <button className="p-2 rounded-full bg-slate-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-white h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </button>
      </div> */}
    </div>
  );
}
