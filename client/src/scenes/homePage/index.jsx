import React, { useEffect, useState } from "react";
import { io } from 'socket.io-client';
import SearchBar from "../../components/searchBar";
import PostCard from "../../components/post/postCard";
import postSvc from "./homeService";
// import PaginationFooter from "../../components/pagination/PaginationFooter";
import { toast } from "react-toastify";
import userSvc from "../profilePage/userService";
import SearchedUserPopup from "../../components/searchBar/searchedUserPopup";

export default function HomePage() {
  const [user, setUser] = useState("Username");
  const [posts, setPosts] = useState([]);
  const [searchedUsers,setSearchedUsers] =useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOption, setSelectedOption] = useState("posts");
  const [showSearchedUserPopup, setShowSearchedUserPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userString = localStorage.getItem("persist:auth");
        if (userString) {
          const { user } = JSON.parse(userString); 
          setUser(JSON.parse(user)); 
        }

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
          setShowSearchedUserPopup(true);
        }
      } catch (error) {
        console.log("Error on homepage : " + error);
      }
    };
    fetchData();
  }, [searchQuery, selectedOption]);
  // }, [searchQuery, currentPage, selectedOption]);

  const handleSearch = (query, selectedOption) => {
    setSearchQuery(query);
    setCurrentPage(1);
    setSelectedOption(selectedOption);
  };

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };

  // const closeSearchedUserPopup = () => {
  //   setShowSearchedUserPopup(false);
  // };

  useEffect(() => {
    // Initialize WebSocket connection for notifications
    const socket = io(import.meta.env.WEBSOCKET_URL || 'http://localhost:3000/');
    // Emit 'add-user' event
    socket.emit('add-user', user._id);

    // Clean up socket connection when component unmounts
    return () => {
      socket.disconnect();
    };
  }, [user]);


  useEffect(() => {
    // const handleScroll = () => {
    //   if (
    //     window.innerHeight + document.documentElement.scrollTop ===
    //     document.documentElement.offsetHeight
    //   ) {
    //     // User has scrolled to the bottom, fetch more posts
    //     fetchMorePosts();
    //   }
    // };
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        fetchMorePosts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [posts]); // Dependency on 'posts' to avoid multiple listeners being added

  const fetchMorePosts = async () => {
    try {
      const response = await postSvc.getAllPosts(searchQuery, currentPage + 1); // Fetch next page
      const newPosts = response?.data?.result;
      if (newPosts?.length === 0) {
        toast.info("No more posts!");
        return;
      }
      console.log("posts",posts)
      console.log("newposts",newPosts)
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setCurrentPage((prevPage) => prevPage + 1); // Increment current page
    } catch (error) {
      console.error("Error fetching more posts: ", error);
    }
  };



  return (
    <>
      <div className="searchbar">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="content flex flex-col items-center gap-4 bg-gray-100">
        {posts &&
          posts.map((element) => (
            <PostCard
              key={element?._id}
              postDetails={element}
              userDetails={user}
            />
          ))}
        {/* <PaginationFooter
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        /> */}
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




// to implement infinite scrolling 
// 1 removed pagination footer
// 2 detect scroll event to bottom of page
// 3 fetch more posts 