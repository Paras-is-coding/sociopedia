import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatContainer from '../../components/chat/ChatContainer';
import Welcome from '../../components/chat/Welcome';
import Contacts from '../../components/chat/Contacts';
import styled from 'styled-components';
import { io } from 'socket.io-client';
import userSvc from '../profilePage/userService';

export default function ChatPage() {
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();
  const [currentChat, setCurrentChat] = useState(undefined);

  // Check user authentication and set current user
  useEffect(() => {
    const userCheck = async () => {
      const token = JSON.parse(localStorage.getItem('persist:auth'))?.token;
      if (!token) {
        navigate('/login');
      } else {
        const localuser = JSON.parse(localStorage.getItem('persist:auth'))?.user;
        const userObject = JSON.parse(localuser);
        setCurrentUser(userObject);
        console.log(localuser)
        console.log("CUser__",userObject)
      }
    };
    userCheck();
  }, []);

  // Establish socket connection and emit "add-user" event
  useEffect(() => {
    if (currentUser) {
      const host = import.meta.env.WEBSOCKET_URL || `http://localhost:3000/`;
      console.log(host)
      socket.current = io(host);

          // Listen for socket connection event
    socket.current.on('connect', () => {
      console.log('Socket is connected!');
    });

      socket.current.emit('add-user', currentUser._id);

    }
   
  
  }, [currentUser]);

  // Fetch contacts for the current user
  useEffect(() => {
    const getContacts = async () => {
      if (currentUser) {
        try {
          const res = await userSvc.getUserFollowing();
          const following = res?.data?.result?.following || [];
          const response = await userSvc.getUserFollowers();
          const followers = response?.data?.result?.followers || [];
        
          const mergedContacts = mergeContacts(following,followers);
          setContacts(mergedContacts);
        } catch (error) {
          console.log('Error fetching contacts:', error);
        }
      }
    };
    getContacts();
  }, [currentUser]);

  // Function to merge new data with existing contacts
const mergeContacts = (existingContacts, newContacts) => {
  // Assuming _id is unique for each contact
  const mergedData = [...existingContacts];
  newContacts.forEach(newContact => {
    if (!existingContacts.some(oldContact => oldContact._id === newContact._id)) {
      mergedData.push(newContact);
    }
  });
  return mergedData;
};

  // Handle chat change
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container className='min-h-[98vh]'>
      <div className="py-2 px-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800 mb-2">Chats</h1>
      </div>
      <div className="container border-r-4">
        {contacts.length > 0 ? (
          <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
        ) : (
          <p className="pl-10 pt-10">Loading contacts...</p>
        )}

        {currentChat === undefined ? (
          currentUser && <Welcome currentUser={currentUser} />
        ) : (
          currentUser && <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background-color: white;

  .container {
    min-height: 80vh;
    width: 98%;
    background-color: rgb(243 244 246);
    display: grid;
    grid-template-columns: 25% 75%;

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
