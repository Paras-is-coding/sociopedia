import React, { useEffect, useState } from 'react';
import userSvc from '../../scenes/profilePage/userService';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function SearchedUserPopup({ searchedUsers, onClose ,currentUser}) {
  const [followedUsers, setFollowedUsers] = useState([]);

  useEffect(() => {
    setFollowedUsers(currentUser.following || []);
}, [currentUser]);

    const handleFollowUnfollow = async (userId) => {
        try {
          await userSvc.addRemoveFollowing(userId);
       
          // fetchData();

        // Update the state based on the current follow status
        setFollowedUsers(prevFollowedUsers => {
            if (followedUsers.includes(userId)) {
                return prevFollowedUsers.filter(id => id !== userId);
            } else {
                return [...prevFollowedUsers, userId];
            }
        });

        } catch (error) {
          console.log("Error unfollowing user:", error);
          toast.error(`Error unfollowing user: ${error}`);
        }
      };
     
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className=" relative bg-gray-100 p-8 rounded-lg w-96">
      <div className="flex justify-end">
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-800 hover:text-gray-400 z-60"
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

        <h1 className="text-xl font-bold text-gray-800 mb-2 text-center">Searched Users</h1>
        <div className="w-full h-[1px] bg-gray-400"></div>
        <ul className="max-h-72 overflow-y-auto">
          {searchedUsers.map((user) => (
            <li key={user._id} className="py-2">
              <div className="flex items-center ">
                <Link
                to={`/home/${user?._id}`}
                >
                <img src={`${import.meta.env.VITE_API_URL}images/user/${user.picturePath}`} alt="Profile" className="w-10 h-10 rounded-full object-cover mr-4" />
                </Link>
                <div>
                <Link
                to={`/home/${user?._id}`}
                >
                  <p className="text-lg font-semibold">{`${user.firstname} ${user.lastname}`}</p>
                  </Link>
                  <p className="text-sm text-gray-400">{user.occupation}</p>
                  <p className="text-sm text-gray-400">{user.location}</p>
                </div>
                {/* {(!currentUser.following?.includes(user._id) && currentUser?._id !== user._id) ?( 
                  <button onClick={() => handleFollowUnfollow(user._id)} className="bg-blue-600 text-white ml-6 px-3 py-1 rounded-full">Follow</button>
                ):( currentUser?._id !== user._id ?
                    <button onClick={()=> handleFollowUnfollow(user._id)} className="bg-gray-400 text-white ml-6 px-3 py-1 rounded-full">Following</button>:
                    ""
                )
                } */}
                  {(!followedUsers.includes(user._id) && currentUser?._id !== user._id) ? (
                                    <button onClick={() => handleFollowUnfollow(user._id)} className="bg-blue-600 text-white ml-6 px-3 py-1 rounded-full">Follow</button>
                                ) : (currentUser?._id !== user._id ?
                                    <button onClick={() => handleFollowUnfollow(user._id)} className="bg-gray-400 text-white ml-6 px-3 py-1 rounded-full">Following</button> :
                                    ""
                                )}
              </div>

              

            </li>
          ))}
        </ul>
        <div className="mt-6 w-full h-[1px] bg-gray-400"></div>

        <div className='w-full text-center opacity-50'>End of results.</div>
      </div>
    </div>
  );
}
