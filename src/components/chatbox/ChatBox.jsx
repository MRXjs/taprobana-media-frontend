import React, { useEffect, useRef, useState } from "react";
import { getUser } from "../../api/UserRequst";
import { addMessage, getMessages } from "../../api/MessageReques";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import "./ChatBox.css";
import Swal from "sweetalert2";

const ChatBox = ({
  chat,
  currentUser,
  setSendMessage,
  recieveMessage,
  senderImg,
}) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef();

  const [messageText, setMessageText] = useState("");
  const isMessageBoxDisabled = messageText.length === 0;

  useEffect(() => {
    if (recieveMessage !== null && recieveMessage.chatId === chat._id) {
      setMessages([...messages, recieveMessage]);
    }
  }, [recieveMessage]);

  // fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  //fetching data for messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);

  const handleChange = (newMessage) => {
    setMessageText(newMessage);
    setNewMessage(newMessage);
  };

  //Send
  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      senderImg: senderImg,
      text: newMessage,
      chatId: chat._id,
    };

    //send message to database
    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }

    // send message to socket server
    const receiverId = chat.members.find((id) => id !== currentUser);
    setSendMessage({ ...message, receiverId });
  };

  // always scroll to the last message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageText, messages]);

  const cbAlert = () => {
    Swal.fire({
      title: "info",
      text: "Maintenance is in progress",
      icon: "info",
      confirmButtonText: "Cool",
    });
  };

  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            <div className="chat-header">
              <div className="follower">
                <div>
                  <img
                    src={
                      userData?.profilePicture
                        ? process.env.REACT_APP_PUBLIC_FOLDER +
                          userData.profilePicture
                        : process.env.REACT_APP_PUBLIC_FOLDER +
                          "defaultProfile.png"
                    }
                    className="followerImage"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                    alt="profile"
                  />
                  <div className="name" style={{ fontSize: "0.8rem" }}>
                    <span>
                      {userData?.firstname} {userData?.lastname}
                    </span>
                  </div>
                </div>
              </div>
              <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
            </div>
            {/*chatbox messages*/}
            <div className="chat-body">
              {messages.map((message) => (
                <>
                  <div
                    ref={scroll}
                    className={
                      message.senderId === currentUser
                        ? "message own"
                        : "message"
                    }
                  >
                    <span>
                      <img
                        src={
                          message.senderImg
                            ? process.env.REACT_APP_PUBLIC_FOLDER +
                              message.senderImg
                            : process.env.REACT_APP_PUBLIC_FOLDER +
                              "defaultProfile.png"
                        }
                        style={{
                          width: "40px",
                          heght: "40px",
                          borderRadius: "50%",
                        }}
                        alt="chatpimg"
                      />
                      {message.text}
                    </span>
                    <span>{format(message.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>
            {/*chat sender*/}
            <div className="chat-sender">
              <div onClick={cbAlert}>+</div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <button
                className="button send-button"
                onClick={handleSend}
                disabled={isMessageBoxDisabled}
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a Chat to start a Conversation...
          </span>
        )}
      </div>
    </>
  );
};

export default ChatBox;
