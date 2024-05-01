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
import { setLogout,removeUser } from "../../redux/features/authSlice";
import sociopedialogo from "../../assets/images/sociopedialogo.png";
import CreatePostPopup from "../post/createPost/CreatePostPopup";
import Swal from "sweetalert2";



const SidebarComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [user, setUser] = useState({});


  useEffect(() => {
    const userString = localStorage.getItem("persist:auth");
    if (userString) {
      const { user } = JSON.parse(userString); 
      console.log("userrrr",userString)
      setUser(JSON.parse(user)); 
    }
    console.log(user)
  }, []);



  const handleLogoutClick = async () => {
    dispatch(setLogout());
    dispatch(removeUser());
    navigate("/login");
  };

  const openCreatePostPopup = () => {
    setIsCreatePostOpen(true);
  };

  const closeCreatePostPopup = () => {
    setIsCreatePostOpen(false);
  };

  return (
    <div className="min-h-screen fixed flex flex-row bg-gray-100 ">
      <div className="flex flex-col w-20 md:w-60 bg-gray-100 rounded-r-3xl overflow-hidden">
        <div className="flex items-center justify-center h-20 shadow-md">
        <Link
            to={'/home'}
            >
          {/* <h1 className="text-3xl uppercase text-gray-600 hidden md:block">
            Sociopedia
          </h1> */}
          <h1 className="text-xl hidden md:block md:text-2xl lg:text-3xl font-bold uppercase text-gray-700 tracking-wide leading-tight transform hover:scale-105 transition duration-300">
  Sociopedia
</h1>

          </Link>
          <div className=" md:hidden flex-shrink-0 items-center ">
          <Link
            to={'/home'}
            >
            <img
              className="h-8 w-auto rounded-lg"
              src={sociopedialogo}
              alt="SOCIOPEDIA"
            />
            </Link>
          </div>
        </div>
        <ul className="flex flex-col py-14 mx-auto">
          <li>
            <Link
              to={"/home"}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 md:text-lg text-4xl text-gray-400">
                <BiHome />
              </span>
              <span className="text-lg font-medium hidden md:block">Home</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/home/chats"}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 md:text-lg text-4xl text-gray-400">
                <BiChat />
              </span>
              <span className="text-lg font-medium hidden md:block">Chat</span>
            </Link>
          </li>
          <li>
            <Link
              to={`/home/${user._id}`}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 md:text-lg text-4xl text-gray-400">
                <BiUser />
              </span>
              <span className="text-lg font-medium hidden md:block">
                Profile
              </span>
            </Link>
          </li>
          <li>
            <button
              onClick={openCreatePostPopup}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 md:text-lg text-4xl text-gray-400">
                <BiPlus />
              </span>
              <span className="text-lg font-medium hidden md:block">
                Create
              </span>
            </button>
          </li>
          <li>
            <Link
              to={"/home/notifications"}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 md:text-lg text-4xl text-gray-400">
                <BiBell />
              </span>
              <span className="text-lg font-medium hidden md:block">
                Notifications
              </span>
              {/* <span className="ml-auto mr-6 text-sm bg-red-100 rounded-full px-3 py-px text-red-500 hidden md:block">
                5
              </span> */}
            </Link>
          </li>
          <li>
            <Link
              to={"/home/settings"}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 md:text-lg text-4xl text-gray-400">
                <BiCog />
              </span>
              <span className="text-lg font-medium hidden md:block">
                Settings
              </span>
            </Link>
          </li>
          <li>
            <Link
              to={"#"}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
              onClick={(e) => {
                e.preventDefault()
                Swal.fire({
                  title: "Are you sure?",
                  text: "You'll be logged out of the device!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, Logout!"
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleLogoutClick();
                  }
                })
              }}
            >
              <span className="inline-flex items-center justify-center h-12 w-12 md:text-lg text-4xl text-gray-400">
                <BiLogOut />
              </span>
              <span className="text-lg font-medium hidden md:block">
                Logout
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

export default SidebarComponent;
