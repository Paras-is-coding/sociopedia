import React, { useEffect } from 'react'
import userSvc from '../../scenes/profilePage/userService';
import { toast } from 'react-toastify';
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";


export default function EditProfilePopupComponent({user,closePopup}) {


    useEffect(() => {
        // Set default values for the form fields after user data is fetched
        setValue("picturePath", user.picturePath || "");
        setValue("firstname", user.firstname || "");
        setValue("lastname", user.lastname || "");
        setValue("bio", user.bio || "");
        setValue("occupation", user.occupation || "");
        setValue("location", user.location || "");
        setValue("phone", user.phone || "");
      }, [user]);
    
      // edit profile form handeling using react-hook-forms and yup
      const schema = Yup.object().shape({
        picturePath: Yup.mixed().test(
          "fileSize",
          "File size is too large",
          (value) => {
            if (!value || value.length === 0) return true; // No file selected, no validation needed
    
            const file = value[0];
            return file.size <= 1024 * 1024; // 1MB max file size
          }
        ),
        firstname: Yup.string().required("First Name is required"),
        lastname: Yup.string().required("Last Name is required"),
        bio: Yup.string().max(255, "Bio must be at most 255 characters"),
        occupation: Yup.string(),
        location: Yup.string(),
        phone: Yup.string(),
      });
    console.log(user)
      const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });


const onSubmit = async (data) => {
    try {
      
      console.log("Data : ", data);
      const response = await userSvc.editUserProfile(data);
      console.log("Update garya res :::", response);
      window.location.reload();
    } catch (error) {
      console.log("E", error);
      toast.error(`Error updating profile: ${error}`);
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
            {/* Your form for editing the profile goes here */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-4 space-y-4 text-gray-600"
            >
              <div className="py-2 px-6 border-b border-gray-200">
                <h1 className="text-xl font-bold text-gray-800 mb-2">
                  Edit Profile
                </h1>
                <div className="w-10 h-1 bg-gray-500"></div>
              </div>

              <div className="flex items-center">
                {/* <label className="w-1/3">Profile Picture:</label> */}
                <Controller
                  name="picturePath"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center">
                      <label className="w-1/3">Profile Picture:</label>
                      <input
                        type="file"
                        accept="image/*"
                        className="w-2/3 border rounded p-2"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          field.onChange([file]);
                        }}
                      />
                    </div>
                  )}
                />

                {errors.picturePath && (
                  <p className="text-red-500">{errors.picturePath.message}</p>
                )}
              </div>
              <div className="flex items-center">
                <label className="w-1/3">First Name:</label>
                <input
                  type="text"
                  className="w-2/3 border rounded p-2"
                  {...register("firstname")}
                />
                {errors?.firstname && (
                  <p className="text-red-500">{errors?.firstname.message}</p>
                )}
              </div>
              <div className="flex items-center">
                <label className="w-1/3">Last Name:</label>
                <input
                  type="text"
                  className="w-2/3 border rounded p-2"
                  {...register("lastname")}
                />
                {errors?.lastname && (
                  <p className="text-red-500">{errors?.lastname.message}</p>
                )}
              </div>
              <div className="flex items-center">
                <label className="w-1/3">Bio:</label>
                <textarea
                  className="w-2/3 border rounded p-2"
                  rows="3"
                  placeholder="Enter bio"
                  {...register("bio")}
                />
                {errors?.bio && (
                  <p className="text-red-500">{errors?.bio.message}</p>
                )}
              </div>
              <div className="flex items-center">
                <label className="w-1/3">Occupation:</label>
                <input
                  type="text"
                  className="w-2/3 border rounded p-2"
                  placeholder="Enter occupation"
                  {...register("occupation")}
                />
                {errors.occupation && (
                  <p className="text-red-500">{errors.occupation.message}</p>
                )}
              </div>
              <div className="flex items-center">
                <label className="w-1/3">Location:</label>
                <input
                  type="text"
                  className="w-2/3 border rounded p-2"
                  placeholder="Enter location"
                  {...register("location")}
                />
                {errors.location && (
                  <p className="text-red-500">{errors.location.message}</p>
                )}
              </div>
              <div className="flex items-center">
                <label className="w-1/3">Phone:</label>
                <input
                  type="text"
                  className="w-2/3 border rounded p-2"
                  placeholder="Enter phone number"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-red-500">{errors.phone.message}</p>
                )}
              </div>
              {/* Add more fields as needed */}
              <button
                type="submit"
                className="bg-gray-600 text-white px-4 py-2 rounded-full hover:bg-gray-400"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
  )
}
