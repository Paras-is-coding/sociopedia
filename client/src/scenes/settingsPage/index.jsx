import React, { useEffect, useState } from "react";
import {
  RiUserSettingsLine,
  RiNotificationLine,
  RiFileSettingsLine,
  RiGlobalLine,
  RiQuestionLine,
  RiSettings4Line,
  RiLogoutCircleLine,
  RiDeleteBin7Line,
} from "react-icons/ri";
import { IoAccessibilityOutline } from "react-icons/io5";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { MdOutlineSecurity } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setLogout } from "../../redux/features/authSlice";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import EditProfilePopupComponent from "../../components/profile/editProfilePopup";
import userSvc from "../profilePage/userService";

function SettingsPage() {
  const [showLogins, setShowLogins] = useState(false);
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [user,setUser] = useState({});
  const [localUser, setLocalUser] = useState({});
  const [userId,setUserId] = useState(null);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false); 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      dispatch(setLogout());
      navigate('/login');
    } catch (error) {
      console.log(error);
      toast.error("Error logging out!", error);
    }
  };

  const openEditProfilePopup = () => {
    setEditProfilePopupOpen(true);
  };
   // Function to close any popup
   const closePopup = () => {
    setEditProfilePopupOpen(false);
  };


  useEffect(() => {
    const  luser = JSON.parse(localStorage.getItem("persist:auth"))?.user;
    const userObject = JSON.parse(luser);
    setLocalUser(userObject);
  }, []);
  useEffect(()=>{
    console.log("lu",localUser)
    setUserId(localUser._id);
  }),[localUser]

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if(userId){
        const response = await userSvc.getUser(userId);
        setUser(response?.data?.result?.user);
        }
      
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [localUser,userId]);

  return (
    <div className="container mx-auto px-10 py-8 ">
       {/* Edit Profile Popup */}
       {isEditProfilePopupOpen && (
        <EditProfilePopupComponent
          user={user}
          closeEditProfilePopup={closePopup}
        />
      )}

      <h1 className="text-3xl font-bold mb-8 text-gray-500">Settings</h1>

      {/* Profile Settings */}
      <section className="mb-8">
        <h2 className="flex items-center text-xl font-semibold mb-4 cursor-pointer text-gray-600 hover:text-gray-400 "
        onClick={openEditProfilePopup}
        >
          <RiUserSettingsLine className="mr-2" />
          Profile Settings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Add profile settings here */}
        </div>
      </section>

      {/* Account Settings */}
      <section className="mb-8">
        <h2 className="flex items-center text-xl font-semibold mb-4 cursor-pointer text-gray-600 hover:text-gray-400"
        onClick={()=> setShowAccountSettings(!showAccountSettings)}
        >
          <RiFileSettingsLine className="mr-2" />
          Account Settings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Add account settings here */}
        </div>
      </section>
       {/*Delete Account */}
       {showAccountSettings && (
        <div className="flex flex-col gap-2 mb-6 ml-3">
          <button
          onClick={(e) => {
            e.preventDefault()
            Swal.fire({
              title: "Are you sure?",
              text: "Your account will be permanently deleted!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete my account!"
            }).then((result) => {
              if (result.isConfirmed) {
                // handleLogout();
                console.log("Delete user!")
              }
            })
          }}
           className="bg-red-600 hover:bg-red-400 text-white py-2 px-4 rounded-lg flex items-center w-44">
            <RiDeleteBin7Line className="mr-2"
             />
            Delete Account
          </button>
        </div>
      )}

      {/* Notification Settings */}
      <section className="mb-8">
        <h2 className="flex items-center text-xl font-semibold mb-4 cursor-pointer text-gray-600 hover:text-gray-400">
          <RiNotificationLine className="mr-2" />
          Notification Settings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Add notification settings here */}
        </div>
      </section>

      {/* Privacy Settings */}
      <section className="mb-8">
        <h2 className="flex items-center text-xl font-semibold mb-4 cursor-pointer text-gray-600 hover:text-gray-400">
          <MdOutlinePrivacyTip className="mr-2" />
          Privacy Settings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Add privacy settings here */}
        </div>
      </section>

      {/* Security Settings */}
      <section className="mb-8">
        <h2 className="flex items-center text-xl font-semibold mb-4 cursor-pointer text-gray-600 hover:text-gray-400">
          <MdOutlineSecurity className="mr-2" />
          Security Settings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Add security settings here */}
        </div>
      </section>

      {/* Accessibility */}
      <section className="mb-8">
        <h2 className="flex items-center text-xl font-semibold mb-4 cursor-pointer text-gray-600 hover:text-gray-400">
          <IoAccessibilityOutline className="mr-2" />
          Accessibility
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Add accessibility settings here */}
        </div>
      </section>

      {/* Language & Region */}
      <section className="mb-8">
        <h2 className="flex items-center text-xl font-semibold mb-4 cursor-pointer text-gray-600 hover:text-gray-400">
          <RiGlobalLine className="mr-2" />
          Language & Region
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Add language & region settings here */}
        </div>
      </section>

      {/* Help & Support */}
      <section className="mb-8">
        <h2 className="flex items-center text-xl font-semibold mb-4 cursor-pointer text-gray-600 hover:text-gray-400">
          <RiQuestionLine className="mr-2" />
          Help & Support
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Add help & support options here */}
        </div>
      </section>

      {/* Logins */}
      <section className="mb-8">
        <h2
          className="flex items-center text-xl font-semibold mb-4 cursor-pointer text-gray-600 hover:text-gray-400"
          onClick={() => setShowLogins(!showLogins)}
        >
          <RiSettings4Line className="mr-2" />
          Logins
        </h2>
      </section>

      {/* Log Out and Delete Account */}
      {showLogins && (
        <div className="flex flex-col gap-4">
          <button
            className="bg-red-600 hover:bg-red-400 text-white py-2 px-4 rounded-lg flex items-center w-44 "
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
                  handleLogout();
                }
              })
            }}
          >
            <RiLogoutCircleLine className="mr-2" />
            Log Out
          </button>
        </div>
      )}

    </div>
  );
}

export default SettingsPage;
