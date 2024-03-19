import React, { useState } from 'react'


// for post
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {toast} from 'react-toastify'
import postSvc from '../../../scenes/homePage/homeService';

const schema = yup.object().shape({
  caption: yup.string().required("Caption is required"),
  // picturePath: yup.string().required("Please select an image"),
  location: yup.string().required("Location is required"),
});
//---

export default function CreatePostPopup({closeCreatePostPopup,user}) {
    const [previewImage, setPreviewImage] = useState(null);


      //for post
  const {
    register,
    handleSubmit,
    setValue,setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues:{
      user: "",
      caption:"",
      location: "",
    }
  });

  const handleImageUpload = (e) => {
    // const files = Object.values(e.target.files); //{{},{}} => [{},{}]
    const image = e.target.files[0];
    console.log("iii",image)

    // validation(ext,size)
    const ext = image.name.split(".").pop();
    if (
      ["jpg", "png", "jpeg", "gif", "svg", "bmp", "webp"].includes(
        ext.toLowerCase()
      )
    ) {
      if (image?.size <= 3000000) {
        setPreviewImage(image);
        setValue("picturePath", image);
      } else {
        setError("picturePath", "File should be less then 3MB.");
      }
    } else {
      setError("picturePath", "File format not supported!");
    }
  };

  const onSubmit = async (data) => {
    console.log("DTOBS",data);
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

      toast.info("Post created successfully!");
      // Reset form and close popup
      closeCreatePostPopup();
    } catch (error) {
      console.log("E", error);
      toast.error(`Error posting: ${error}`);
    }
    
  };
  //---


  return (
    <>
    <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-100 rounded-lg p-8 relative">

           <div className="flex justify-end">
             {/* Close button */}
             <button
                onClick={closeCreatePostPopup}
                className="absolute top-2 right-2 text-gray-800 hover:text-gray-400 z-60"
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
           </div>
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
               {/* Display previous profile picture if available */}
          {previewImage && (
            <div className="flex justify-center">
              <img
                src={previewImage &&
                  previewImage instanceof File && URL.createObjectURL(previewImage)
                }
                alt="Previous Profile"
                className="rounded-full h-16 w-16 object-cover"
              />
            </div>
          )}
              <div className="mb-4">
                <label htmlFor="picturePath" className="block text-gray-700">
                  Image:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="picturePath"
                  // {...register("picturePath")}
                  className="w-full rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  onChange={handleImageUpload}
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

              
            </form>
          </div>
        </div>
    </>
  )
}
