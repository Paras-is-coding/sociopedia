import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import postSvc from "../../scenes/homePage/homeService";
import { toast } from "react-toastify";
import CommentEditForm from "../commentEditForm";

export default function CommentComponent({ comment,postDetails,userDetails,setComments }) {
  const [commentEditMode, setCommentEditMode] = useState(false);


  function toggleCommentEditMode() {
    commentEditMode ? setCommentEditMode(false) : setCommentEditMode(true);
  }

  const handleDeleteComment = async(commentId) =>{
    try {
    
      const response = await postSvc.deleteComment(commentId);
      toast.success("Comment deleted successfully!");
      setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
      // window.location.reload(); 

    } catch (error) {
      console.log("E", error);
      toast.error(`Error deleting comment: ${error}`);
    }
  }
  
  return (<>
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
{
  ( (comment?.userId === userDetails?._id ) || (postDetails?.user === userDetails?._id)) && 
  (
    <div className="flex items-center justify-center pl-10 gap-2 text-gray-500 ">
      {
        (comment?.userId === userDetails?._id ) &&
        <FaEdit
        onClick={toggleCommentEditMode}
         className="hover:text-customDark"/>
      }
        <FaTrash 
        onClick={() => handleDeleteComment(comment?._id)}
        className="hover:text-customDark"/>
      </div>
  )

}
       
    </div>
    {
      commentEditMode ?
      <CommentEditForm comment={comment}/>:
      ""
    }
    </>

  );
}
