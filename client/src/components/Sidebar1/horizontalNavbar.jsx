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
import sociopedialogo from "../../assets/images/sociopedialogo.png";

// for post
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import postSvc from "../../scenes/homePage/homeService";
import {toast} from 'react-toastify'

const schema = yup.object().shape({
  caption: yup.string().required("Caption is required"),
  picturePath: yup.string().required("Please select an image"),
  location: yup.string().required("Location is required"),
});
//---

const HorizontalNavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [user, setUser] = useState("Username");

  useEffect(() => {
    const localuser = JSON.parse(localStorage.getItem("persist:auth"))?.user;
    const userObject =  JSON.parse(localuser);
    setUser(userObject);
    console.log(user)
  }, []);

  //for post
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues:{
      user: "",
      picturePath:"", 
      caption:"",
      location: "",
    }
  });
  const onSubmit = async (data) => {
    console.log(data);
    data={
      ...data,
      user:user?._id
    }
    console.log(data)
    // Your logic to submit the create post
    try {
      console.log("Data : ", data);
      const response = await postSvc.createPost(data);
      console.log("Post gareko res:"+response)

      // Reset form and close popup
      closeCreatePostPopup();
    } catch (error) {
      console.log("E", error);
      toast.error(`Error posting: ${error}`);
    }
    
  };
  //---

  const handleLogoutClick = async () => {
    await dispatch(setLogout());
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
              to={"/home/profile"}
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
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-100 rounded-lg p-8">
            {/* Create Post Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Fields for creating a post */}
              <div className="py-2 px-6 border-b border-gray-200">
                <h1 className="text-xl font-bold text-gray-800 mb-2">
                  Create Post
                </h1>
                <div className="w-10 h-1 bg-gray-500"></div>
              </div>
              <div className="mb-4">
                <label htmlFor="caption" className="block text-gray-700">
                  Caption:
                </label>
                <input
                  type="text"
                  id="caption"
                  {...register("caption")}
                  className="w-full rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.caption && (
                  <span className="text-red-500">{errors.caption.message}</span>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="picturePath" className="block text-gray-700">
                  Image:
                </label>
                <input
                  type="file"
                  id="picturePath"
                  {...register("picturePath")}
                  className="w-full rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.picturePath && (
                  <span className="text-red-500">
                    {errors.picturePath.message}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="location" className="block text-gray-700">
                  Location:
                </label>
                <input
                  type="text"
                  id="location"
                  {...register("location")}
                  className="w-full rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.location && (
                  <span className="text-red-500">
                    {errors.location.message}
                  </span>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Submit
                </button>
              </div>

              {/* Close button */}
              <button
                onClick={closeCreatePostPopup}
                className="absolute top-5 right-5 text-white hover:text-gray-700"
              >
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
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
      {/* End of Create Post Popup */}
    </div>
  );
};

export default HorizontalNavBar;
