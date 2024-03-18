import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import postSvc from "../../scenes/homePage/homeService";
import {toast} from 'react-toastify'


const schema = yup.object().shape({
  text: yup.string().required().min(1).max(500)
});

export default function CommentForm({ userId, postId }) {
  const { register, handleSubmit, formState: { errors },reset } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit =async (data) => {
    // Handle form submission here
    try {
      console.log("Data : ", data);
      let commentData = {
        ...data,
        userId,
        postId
      };
      const response = await postSvc.addComment(commentData);
      toast.success("Comment added successfully!");
      reset(); // Reset the form after successful submission
      window.location.reload(); // Refresh the page to reflect new comment

    } catch (error) {
      console.log("E", error);
      toast.error(`Error updating profile: ${error}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl bg-white rounded-lg border p-2 mx-auto mt-20"
    >
      <div className="px-3 mb-2 mt-2">
        <textarea
          {...register("text")}
          placeholder="Write a comment"
          className={`w-full bg-gray-100 rounded border border-gray-400 leading-normal resize-none h-20 py-2 px-3 font-medium placeholder-gray-500 focus:bg-white focus:border-gray-500 focus:outline-none ${
            errors.text ? "border-red-500" : ""
          }`}
        ></textarea>
        {errors.text && (
          <p className="text-red-500 text-sm mt-1"> {errors.text.message}</p>
        )}
      </div>   
      <div className="flex justify-end px-4">
        <input
          type="submit"
          className="px-2.5 py-1.5 rounded-md text-white text-sm bg-gray-500 hover:bg-gray-600"
          value="Comment"
        />
      </div>
    </form>
  );
}
