import React, { useEffect, useState } from "react";
import {
  BiHome,
  BiChat,
  BiUser,
  BiBell,
  BiLogOut,
  BiCog,
  BiPlus,
} from "react-icons/bi";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../../redux/features/authSlice";
import CreatePostPopup from "../post/createPost/CreatePostPopup";



const HorizontalNavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [user, setUser] = useState("Username");

  useEffect(() => {

    const userString = localStorage.getItem("persist:auth");
    if (userString) {
      const { user } = JSON.parse(userString); 
      setUser(JSON.parse(user)); 
    }
    console.log(user)
  }, []);


  const handleLogoutClick = async () => {
     dispatch(setLogout());
    navigate("/login");
  };

  const openCreatePostPopup = () => {
    setIsCreatePostOpen(true);
  };

  const closeCreatePostPopup = () => {
    setIsCreatePostOpen(false);
  };

  return (
    <div className="h-[6vh] fixed flex flex-row bg-gray-100 ">
      <div className="flex flex-col w-screen bg-white rounded-3xl overflow-hidden">
        <ul className="flex gap-1 items-center justify-center">
          <li>
            <Link
              to={"/home"}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 md:text-lg text-xl text-gray-400">
                <BiHome />
              </span>
            </Link>
          </li>
          <li>
            <Link
              to={"/home/chats"}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 md:text-lg text-xl text-gray-400">
                <BiChat />
              </span>
            </Link>
          </li>
          <li>
            <Link
              to={`/home/${user?._id}`}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 md:text-lg text-xl text-gray-400">
                <BiUser />
              </span>
            </Link>
          </li>
          <li>
            <button
              onClick={openCreatePostPopup}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 md:text-lg text-xl text-gray-400">
                <BiPlus />
              </span>
            </button>
          </li>
          <li>
            <Link
              to={"/home/notifications"}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 md:text-lg text-xl text-gray-400">
                <BiBell />
              </span>
              <span className="ml-auto mr-6 text-sm bg-red-100 rounded-full px-3 py-px text-red-500 hidden md:block">
                5
              </span>
            </Link>
          </li>
          <li>
            <Link
              to={"/home/settings"}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 md:text-lg text-xl text-gray-400">
                <BiCog />
              </span>
            </Link>
          </li>
          <li>
            <Link
              to={"#"}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
              onClick={handleLogoutClick}
            >
              <span className="inline-flex items-center justify-center h-12 w-12 md:text-lg text-xl text-gray-400">
                <BiLogOut />
              </span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Create Post Popup */}
      {isCreatePostOpen && (
        <CreatePostPopup closeCreatePostPopup={closeCreatePostPopup} user={user}/>
      )}
      {/* End of Create Post Popup */}
    </div>
  );
};

export default HorizontalNavBar;
