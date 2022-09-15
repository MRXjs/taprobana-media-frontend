import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import LogoSearch from "../../components/logoSearch/LogoSearch";
import { userChats } from "../../api/ChatRequest";
import Conversation from "../../components/conversation/Conversation";
import Navbar from "../../components/navbar/Navbar";
import ChatBox from "../../components/chatbox/ChatBox";
import { io } from "socket.io-client";
import "./Chat.css";
import ProfileModal from "../../components/profileModal/ProfileModal";

const Chat = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [recieveMessage, setRecieveMessage] = useState(null);
  const socket = useRef();
  const [settingOpen, setSettingOpen] = useState(false);

  //send message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_SOCKET_URL);
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  //receive Message from socket server
  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setRecieveMessage(data);
    });
  }, []);

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user]);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <div className="Chat">
      {/*Left Side*/}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
              <div onClick={() => setCurrentChat(chat)}>
                <Conversation
                  data={chat}
                  currentUserId={user._id}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/*Right Side*/}
      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <Navbar settingOpen={setSettingOpen} />
        </div>
        {/*Chat body*/}
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          recieveMessage={recieveMessage}
          senderImg={user.profilePicture}
        />
      </div>
      <ProfileModal
        modalOpened={settingOpen}
        setModalOpened={setSettingOpen}
        data={user}
      />
    </div>
  );
};

export default Chat;
