import React from 'react'

export default function CommentComponent({comment}) {
  return (
    <div className="flex items-center space-x-2 mt-2">
            <img src={`${import.meta.env.VITE_API_URL}images/user/${comment?.userPicturePath}`} alt="User Avatar" className="w-6 h-6 rounded-full" />
            <div>
              <p className="text-gray-800 font-semibold">{`${comment?.firstname} ${comment?.lastname}`}</p>
              <p className="text-gray-500 text-sm">{comment?.text}</p>
            </div>
    </div>
  )
}
