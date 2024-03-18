import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import userSvc from '../../scenes/profilePage/userService';
import SearchBar from '../searchBar';

export default function FollowersFollowingPopupComponent({ type, user, closePopup }) {
  // State to store followers/following data
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch followers or following data based on the type (followers/following)
    const fetchData = async () => {
      try {
        if (type === 'followers') {
          const response = await userSvc.getUserFollowers(user?._id);
          setData(response?.data?.result?.followers);
        }
        if (type === 'following') {
          const response = await userSvc.getUserFollowing(user?._id);
          setData(response?.data?.result?.following);
        }

      } catch (error) {
        console.log("Error fetching data:", error);
        toast.error(`Error fetching ${type}: ${error}`);
      }
    };

    fetchData();

    // Cleanup function to reset data when unmounting
    return () => setData([]);
  }, [type, user]);

  const handleFollow = async (userId) => {
    try {
      await userSvc.followUser(userId);
      // Refresh data after following
      fetchData();
    } catch (error) {
      console.log("Error following user:", error);
      toast.error(`Error following user: ${error}`);
    }
  };

  const handleFollowUnfollow = async (userId) => {
    try {
      await userSvc.addRemoveFollowing(userId);
      // Refresh data after unfollowing
      fetchData();
    } catch (error) {
      console.log("Error unfollowing user:", error);
      toast.error(`Error unfollowing user: ${error}`);
    }
  };
 

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-96">
        <div className="flex justify-end">
          <button
            onClick={closePopup}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <h1 className="text-xl font-bold text-gray-800 mb-2 text-center">{type === 'followers' ? 'Followers' : 'Following'}</h1>
        <div className="w-full h-[1px] bg-gray-400" ></div>
        <SearchBar/>
        <ul className="max-h-72 overflow-y-auto">
          {data.slice(0,5).map((item, index) => (
            <li key={index} className="flex items-center justify-between border-b py-2">
              <div className="flex items-center">
                <img src={item.picturePath} alt="Profile" className="w-10 h-10 rounded-full object-cover mr-4" />
                <div>
                  <p className="text-lg font-semibold">{`${item.firstname} ${item.lastname}`}</p>
                  <p className="text-sm text-gray-400">{item.occupation}</p>
                  <p className="text-sm text-gray-400">{item.location}</p>
                </div>
              </div>
              {type === 'followers'?(
                // Render follow button only if it's the following popup and the user is not already following this person
                !user.following?.includes(item._id) ?( 
                  <button onClick={() => handleFollowUnfollow(item._id)} className="bg-blue-600 text-white px-3 py-1 rounded-full">Follow</button>
                ):(
                    <button onClick={()=> handleFollowUnfollow(item._id)} className="bg-gray-400 text-white px-3 py-1 rounded-full">Following</button>
                )
              ):(
                <button onClick={()=> handleFollowUnfollow(item._id)} className="bg-gray-400 text-white px-3 py-1 rounded-full">Following</button>
              )
                
              }
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
