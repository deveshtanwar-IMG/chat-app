import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import "../screens/chat/chat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import {
  faPaperclip,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { getAPIAuth, postAPIAuth } from "../services/api";
import { useSocket } from "../utils/socketContext";
// const prefix = "http://192.168.1.100:8080";
const prefix = "http://localhost:8080";

const ChatBox = ({ chatId }) => {
  const [chat, setChat] = useState({});
  const [message, setMessage] = useState("");
  const [loggedUser, setLoggedUser] = useState("");
  // const [fetchMessage, setFetchMessage] = useState([]);
  const [socketMessage, setSocketMessage] = useState([]);
  const ref = useRef(null);
  const navigate = useNavigate();

  const socket = useSocket();

  console.log(
    "::::::::::::::::::socketMessage::::::::::::::::::",
    socketMessage
  );

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("loggedUserId")));
    chatHandler();
    socket.on("recieve", (msg) => {
      // setFetchMessage((prev) => [...prev, msg]);
      setSocketMessage((prev) => [...prev, msg]);
      scrollToBottom();
    });
  }, [chatId]);

  useEffect(() => {
    if (chat?._id) {
      fetchAllMessages(chat._id);
    }
    scrollToBottom();
  }, [chat?._id]);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("loggedUserId");
    navigate("/");
  };

  const chatHandler = async () => {
    const res = await getAPIAuth(`chat/fetchChat/${chatId}`);
    setChat(res.data.isChat);
  };

  const fetchAllMessages = async (chatId) => {
    const res = await getAPIAuth(`message/allMessage/${chatId}`);
    // setFetchMessage(res.data.allMessage);
    setSocketMessage(res.data.allMessage);
  };

  const sendHandler = async (e) => {
    e.preventDefault();

    socket.emit("message", { message, chatId, loggedUser });

    const res = await postAPIAuth("message/sendMessage", {
      chatId: chat._id,
      content: message,
    });

    setMessage("");
  };

  const scrollToBottom = () => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  return (
    <>
      <div className="chat-header clearfix">
        <div className="row">
          <div className="col-lg-6 flex items-center">
            {chat?.users?.map((val) => {
              if (val._id != loggedUser) {
                return (
                  <div key={val._id} className="d-flex">
                    <div>
                      <img src={`${prefix}/${val.image}`} alt="avatar" />
                    </div>
                    <div className="chat-about">
                      <h3 className="m-0 p-0 font-bold text-2xl">
                        {val.username?.slice(0, 1).toUpperCase() +
                          val.username?.slice(1)}
                      </h3>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div className="col-lg-6 hidden-sm text-right flex justify-end">
            <div
              className="logout w-40 bg-blue-50 h-10 flex justify-center items-center rounded"
              onClick={logoutHandler}
            >
              <div className="flex items-center ">
                <p className="m-0 font-bold font-sans p-3">Logout</p>
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  className="text-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="chat-history">
        <ul className="m-b-0">
          {/*fetchMessage state */}
          {socketMessage.map((val, index) => {
            if (val.sender._id == loggedUser) {
              return (
                <li className="clearfix" key={index}>
                  <div className="message-data text-right"></div>
                  <div className="message other-message float-right">
                    {" "}
                    {val.content}{" "}
                  </div>
                </li>
              );
            } else {
              return (
                <li className="clearfix" key={index}>
                  <div className="message-data"></div>
                  <div className="message my-message">{val.content}</div>
                </li>
              );
            }
          })}
          <div ref={ref}></div>
        </ul>
      </div>
      <form className="chat-message clearfix">
        <div className="input-group mb-0">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <FontAwesomeIcon icon={faPaperclip} className="text-2xl" />
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Enter text here..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button
            className="input-group-prepend"
            type="submit"
            onClick={(e) => {
              sendHandler(e);
            }}
          >
            <span className="input-group-text">
              <FontAwesomeIcon icon={faPaperPlane} className="text-2xl" />
            </span>
          </button>
        </div>
      </form>
    </>
  );
};

export default ChatBox;
