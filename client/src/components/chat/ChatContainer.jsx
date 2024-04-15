import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import ChatInput from './ChatInput'
import chatSvc from '../../scenes/chatPage/chatService'
import { generateRandomString } from '../../utils/generateRandomString' 
import { Link } from 'react-router-dom'
// import Logout from './Logout'

export default function ChatContainer({currentChat,currentUser,socket}) {
    const [messages,setMessages] = useState([]);
    const [arrivalMessage,setarrivalMessage] = useState(null);
    const scrollRef = useRef();

    useEffect(()=>{
        if(currentChat){
            const fetchChats = async()=>{
                const response = await chatSvc.getMsgs({
                    from:currentUser._id,
                    to:currentChat._id
                });
                setMessages(response?.data?.result);
            }
            fetchChats();
        }
    },[currentChat])


    const handleSendMsg = async(msg)=>{
       try {
        const {result} = await chatSvc.addMsg({
            from:currentUser._id,
            to:currentChat._id,
            message:msg,
        });

        // emit "send-msg" event
        socket.current.emit("send-msg",{
            to:currentChat._id,
            from:currentUser._id,
            messsage:msg
        });
        // update current messages array by pushing message sent by currentUser
        const msgs = [...messages];
        msgs.push({fromSelf:true,message:msg})
        setMessages(msgs)

       } catch (error) {
        console.log(error)        
       }
    };

    // runs when component loads, if we've socket.current we'll emit 'msg-receive' event
    useEffect(()=>{
        if(socket.current){
            socket.current.on("msg-receive",(msg)=>{
                setarrivalMessage({fromSelf:false,message:msg});
            })
        }
    },[]);

    // runs everytime new arrivalMessage is there and will add it to messages array
    useEffect(()=>{
        arrivalMessage && setMessages((prev)=>[...prev,arrivalMessage]);
    },[arrivalMessage])

    // for scrolling to view new messages 
    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behaviour:"smooth"});
    },[messages])


  return (
   <>
   {
    currentChat && (
        <Container>
        <div className="chat-header">
            <div className="user-details">
                <div className="avatar">
                    <Link
                    to={`/home/${currentChat?._id}`}
                    >
                <img 
                src={currentChat.picturePath && `${import.meta.env.VITE_API_URL}images/user/${
                    currentChat?.picturePath}`}
                 alt="User"
                 />
                 </Link>
                </div>
                <Link
                    to={`/home/${currentChat?._id}`}
                    >
                <div className="username">
                    <h3>{`${currentChat.firstname} ${currentChat.lastname}`}</h3>
                </div>
                </Link>
            </div>
            {/* <Logout/> */}
        </div>


        <div className="chat-messages">
            { messages &&
                messages.map((message)=>{
                    console.log(message)
                        return(
                            <div ref={scrollRef} key={generateRandomString()}>
                                <div className={`message ${message?.fromSelf ?"sended":"received"}`}>
                                    <div className="content">
                                        <p>
                                            {message.message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                })
            }
        </div>
        <ChatInput handleSendMsg={handleSendMsg}/>
    </Container>
    )
   }
   </>
  )
}




const Container = styled.div`
padding:1.2rem;
display:grid;
gap:0.1rem;
overflow:hidden;
grid-template-rows: 10% 78% 12%;

@media screen and (min-width:720px) and (max-width:1080px){
    grid-template-rows:15% 70% 15%;
}
.chat-header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:0 2rem;
    .user-details{
        display:flex;
        align-items:center;
        gap:1rem;
        .avatar {
            img {
                height: 2rem;
                width: 2rem;
                border-radius: 50%; 
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
                max-inline-size: 100%;
                object-fit: cover;
            }
            }
        .username{
            h3{
                color:rgb(15 23 42);
            }
        }
    }
}

.chat-messages{
    padding:1rem 2rem;
    display:flex;
    flex-direction:column;
    gap:1rem;
    overflow:auto;
    &::-webkit-scrollbar {
        width: 0.2rem;
        &-thumb {
          background-color: #ffffff39;
          width: 0.1rem;
          border-radius: 1rem;
        }
      }
    .message{
        display:flex;
        align=items:center;
        .content{
            max-width:40%;
            overflow-wrap:break-word;
            padding:1rem;
            font-size:1.2rem;
            border-radius:1rem;
            color:black;
        }
    }
    
    .sended{
        justify-content:flex-end;
        .content{
            color:white;
            background-color: #9f7aea;
            // background-image: linear-gradient(to bottom right, #2d2d2d, #9f7aea, #fbcfe8);
        }
    }
    .received{
        justify-content:flex-start;
        .content{

            background-color:#f7fafc;
        }
    }
}
`