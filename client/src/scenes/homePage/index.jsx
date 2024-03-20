import React, { useEffect, useState } from "react";
import SearchBar from "../../components/searchBar";
import PostCard from "../../components/post/postCard";
import postSvc from "./homeService";
import PaginationFooter from "../../components/pagination/PaginationFooter";
import { toast } from "react-toastify";
import userSvc from "../profilePage/userService";
import SearchedUserPopup from "../../components/searchBar/searchedUserPopup";
// import { Outlet } from 'react-router-dom'

export default function HomePage() {
  const [user, setUser] = useState("Username");
  const [posts, setPosts] = useState([]);
  const [searchedUsers,setSearchedUsers] =useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // filter
  const [selectedOption, setSelectedOption] = useState("posts");
  const [showSearchedUserPopup, setShowSearchedUserPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("persist:auth"))?.user;
        const userObject = JSON.parse(user);
        setUser(userObject);

        let response;
        if (selectedOption === "posts") {
          response = await postSvc.getAllPosts(searchQuery, currentPage);
          const allPosts = response?.data?.result;
          const totalPosts = response?.data?.meta?.total || 1;
          if (allPosts?.length === 0) {
            toast.info("No posts found!");
          }
          setPosts(allPosts);
          setTotalPages(Math.ceil(totalPosts / 10));

        } else if (selectedOption === "people") {
          response = await userSvc.getAllUsers(searchQuery); 
          setSearchedUsers(response?.data?.result);
          setShowSearchedUserPopup(true);        }
      } catch (error) {
        console.log("Error on homepage : " + error);
      }
    };
    fetchData();
  }, [searchQuery, currentPage, selectedOption]);

  const handleSearch = (query, selectedOption) => {
    setSearchQuery(query);
    setCurrentPage(1);
    setSelectedOption(selectedOption);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  const closeSearchedUserPopup = () => {
    setShowSearchedUserPopup(false);
  };
  return (
    <>
      <div className="searchbar">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="content flex flex-col items-center gap-4 bg-gray-100">
        {/* <Outlet/> */}
        {posts &&
          posts.map((element) => (
            <PostCard
              key={element?._id}
              postDetails={element}
              userDetails={user}
            />
          ))}
        <PaginationFooter
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {showSearchedUserPopup && (
        <SearchedUserPopup
          searchedUsers={searchedUsers}
          onClose={closeSearchedUserPopup}
          currentUser={user}
        />
      )}
    </>
  );
}
