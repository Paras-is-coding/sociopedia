import React, { useEffect, useState } from 'react'
import SearchBar from '../../components/searchBar'
import PostCard from '../../components/post/postCard';
import postSvc from './homeService';
// import { Outlet } from 'react-router-dom'

export default function HomePage() {
  const [user,setUser] = useState("Username")
  const [posts,setPosts] = useState([])

 useEffect(() => {
  
  const fetchData = async () =>{
    try {
      const user = (JSON.parse(localStorage.getItem('persist:auth')))?.user;
      const userObject = JSON.parse(user);
      setUser(userObject);

      const allPosts = (await postSvc.getAllPosts())?.data?.result?.allPosts;
      console.log(allPosts)
      setPosts(allPosts);
      
    } catch (error) {
      console.log("Error on homepage : "+error)
    }
  };
 
  fetchData();

 }, []);

 
  return (
    <> 
    <div className="searchbar">
    <SearchBar/>
    </div>
    <div className="content flex flex-col items-center gap-4 bg-gray-100">
    {/* <Outlet/> */}
    { posts &&
      posts.map(element => (
        <PostCard key={element?._id} postDetails={element} userDetails={user}/>
      ))
    }
    
    </div>
    </>
  )
}
