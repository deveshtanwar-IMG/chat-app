import React, { useEffect, useState } from "react";
import "./chat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faMagnifyingGlass,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { faRocketchat } from "@fortawesome/free-brands-svg-icons";
import ChatModel from "../../components/ChatModal";
import { getAPIAuth } from "../../services/api";
import NoChat from "../../components/NoChat";
import ChatBox from "../../components/ChatBox.jsx";
import { useSocket } from "../../utils/socketContext.jsx";

const Chat = () => {
  // chat modal
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [loggedUser, setLoggedUser] = useState("");
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  // const prefix = "http://192.168.1.100:8080";
  const prefix = "http://localhost:8080";

  const socket = useSocket();

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("loggedUserId")));
    chatHandler();
  }, []);

  const chatHandler = async () => {
    const res = await getAPIAuth("chat/fetchChats");
    setChats(res.data.chats);
  };

  const handleClose = () => {
    setChatModalOpen(false);
  };

  const selectedChatHandler = (chatId) => {
    setSelectedChat(chatId);
    socket.emit("join chat", chatId);
  };

  return (
    <div className="container">
      <ChatModel isOpen={chatModalOpen} onClose={handleClose} />
      <div className="row clearfix mt-3">
        <div className="col-lg-12">
          <div className="card chat-app">
            <div id="plist" className="people-list">
              <div className="flex w-full mb-2">
                <div className="w-3/4 bg-blue-500 h-10 flex justify-center items-center rounded mx-1">
                  <div className="flex items-center ">
                    <p className="m-0 text-white font-bold font-sans p-1">
                      RocketChat
                    </p>
                    <FontAwesomeIcon
                      icon={faRocketchat}
                      className="text-white text-xl"
                    />
                  </div>
                </div>
                <div className="w-1/4 bg-blue-100 h-10 flex justify-center items-center rounded mx-1 cursor-pointer">
                  <div className="flex items-center ">
                    <FontAwesomeIcon
                      icon={faIdCard}
                      className="text-xl text-blue-500"
                    />
                  </div>
                </div>
              </div>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search chats ... "
                />
              </div>
              <ul className="list-unstyled chat-list mt-2 mb-0 border">
                {chats &&
                  chats.map((val) => (
                    <div
                      key={val._id}
                      onClick={() => selectedChatHandler(val._id)}
                    >
                      {val.isGroupChat ? (
                        <li className="clearfix">
                          <img
                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                            alt="avatar"
                          />
                          <div className="about">
                            <div className="name">
                              {val.chatName.slice(0, 1).toUpperCase() +
                                val.chatName.slice(1)}
                            </div>
                            <small>
                              <b>users :</b>{" "}
                              {val.users.length < 4 &&
                                val.users.map((user) => (
                                  <p className="p-0 m-0 inline" key={user._id}>
                                    {user.username}{" "}
                                  </p>
                                ))}
                            </small>
                          </div>
                        </li>
                      ) : (
                        // if GroupChat = false
                        <li className="clearfix">
                          {val.users.map((user) => {
                            if (user._id !== loggedUser) {
                              return (
                                <React.Fragment key={user._id}>
                                  <img
                                    src={`${prefix}/${user.image}`}
                                    alt="avatar"
                                  />
                                  <div className="about">
                                    <div className="name">{user.username}</div>
                                    <small className="email text-gray-600">
                                      {user.email}
                                    </small>
                                  </div>
                                </React.Fragment>
                              );
                            }
                            return null;
                          })}
                        </li>
                      )}
                    </div>
                  ))}
              </ul>

              <div className="flex w-full mb-1">
                <div
                  className="new-chat w-48 bg-blue-50 h-10 flex justify-center items-center rounded mx-2 border"
                  onClick={() => {
                    setChatModalOpen(true);
                  }}
                >
                  <div className="flex items-center ">
                    <p className="m-0 font-sans p-1">New Chat</p>
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                </div>
                <div className="w-48 bg-green-500 h-10 flex justify-center items-center rounded mx-2">
                  <div className="flex items-center ">
                    <p className="m-0 text-white font-bold font-sans p-1">
                      Group
                    </p>
                    <FontAwesomeIcon
                      icon={faUserGroup}
                      className="text-white text-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="chat">
              {selectedChat != null ? (
                <ChatBox chatId={selectedChat} />
              ) : (
                <NoChat />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
