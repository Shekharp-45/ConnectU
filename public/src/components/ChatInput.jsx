import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}




const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 1rem; /* Adjusted padding for smaller screens */
  
  @media screen and (min-width: 320px) and (max-width: 720px) {
    gap: 1rem; /* Added gap for better spacing on smaller screens */
  }
  
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 0.5rem; /* Adjusted gap for smaller screens */
    
    .emoji {
      position: relative;
      
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          
          &-thumb {
            background-color: #9a86f3;
          }
        }
        
        .emoji-categories button {
          filter: contrast(0);
        }
        
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem; /* Adjusted gap between elements */
    background-color: #ffffff34;
    
    input {
      width: 100%;
      height: 100%; /* Adjusted height to fill container */
      background-color: transparent;
      color: white;
      border: none;
      padding: 0.8rem; /* Adjusted padding for better input appearance */
      font-size: 1.2rem;
      
      &::selection {
        background-color: #9a86f3;
      }
      
      &:focus {
        outline: none;
      }
    }
    
    button {
      padding: 0.5rem 1.5rem; /* Adjusted padding for smaller screens */
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      
      svg {
        font-size: 2rem;
        color: white;
      }
      
      @media screen and (min-width: 320px) and (max-width: 720px) {
        padding: 0.3rem 1rem; /* Further adjusted padding for smaller screens */
        
        svg {
          font-size: 1.5rem; /* Adjusted icon size for smaller screens */
        }
      }
    }
  }
`;






