import React, { useState } from 'react';
import styled from 'styled-components';
import Picker from 'emoji-picker-react';
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';

export default function ChatInput({ handleSendMsg }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState('');

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emoji, event) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg('');
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {showEmojiPicker && (
            <div className="emoji-picker-react">
              <Picker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <input
        className='size-4 md:size-6 lg:size-8'
          type="text"
          placeholder="Type your message here"
          value={msg}
          onChange={(e) => {
            showEmojiPicker && setShowEmojiPicker(false);
            setMsg(e.target.value);
          }}
        />
        <button className="submit">
          <IoMdSend className='size-4 md:size-6 lg:size-8' />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #f0f0f0; /* Light gray background */
  padding: .5rem 1rem;
  padding-bottom: 0.3rem;
  .button-container {
    display: flex;
    align-items: center;
    color: black; /* Text color */
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #cccccc; /* Light gray icon color */
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -460px;
      }
    }
  }
  .input-container {
    width: 100%;
    background-color: #ffffff; /* White background */
    border-radius: 2rem;
    display: flex;
    align-items: center;
    input {
      width: 90%;
      background-color: #ffffff; /* White background */
      color: black; /* Text color */
      border: none;
      padding-left: 1rem;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 1rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color:rgb(107 114 128) ;
      border: none;
      svg {
        color: white;
      }
    }
  }
`;
