import React from "react";
import { Link } from "react-router-dom";

export default function CommentComponent({ comment }) {
  return (
    <div className="flex items-center space-x-2 mt-2">
      <Link to={`/home/${comment?.userId}`}>
        <img
          src={`${import.meta.env.VITE_API_URL}images/user/${
            comment?.userPicturePath
          }`}
          alt="User Avatar"
          className="w-6 h-6 rounded-full"
        />
      </Link>

      <div>
        <Link to={`/home/${comment?.userId}`}>
          <p className="text-gray-800 font-semibold">{`${comment?.firstname} ${comment?.lastname}`}</p>
        </Link>
        <p className="text-gray-500 text-sm">{comment?.text}</p>
      </div>
    </div>
  );
}
