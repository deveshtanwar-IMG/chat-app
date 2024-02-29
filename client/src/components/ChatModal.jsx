import React, { useEffect, useRef, useState } from "react";
import "../screens/chat/chat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { getAPIAuth, postAPIAuth } from "../services/api";

// react toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChatModel = ({ isOpen, onClose }) => {
  const [users, setUsers] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const timerRef = useRef(null);
  // const prefix = "http://192.168.1.100:8080";
  const prefix = "http://localhost:8080";

  // search and contacts api call
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      getSearchUsers();
    }, 500);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [searchKey]);

  const getUsers = async () => {
    const res = await getAPIAuth("user/getUsers");
    // console.log("getUsers res : ", res);
    setUsers(res.data.data);
  };

  const getSearchUsers = async () => {
    if (searchKey != "") {
      const res = await getAPIAuth(`user/searchUsers?username=${searchKey}`);
      setUsers(res.data.data);
      // console.log("search users : ", res);
    } else {
      getUsers();
    }
  };

  const chatHandler = async (userId) => {
    const res = await postAPIAuth("chat/accessChat", { userId: userId });
    // console.log(res);
  };

  if (!isOpen) return null;
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        // display: "flex",
        // alignItems: "center",
        // justifyContent: "center",
        zIndex: 99,
      }}
    >
      <div
        style={{
          background: "white",
          height: "100vh",
          width: "300px",
          // margin: "auto",
          // padding: "2%",
          // borderRadius: "10px",
          boxShadow: "1px solid gray",
        }}
      >
        <div id="plist" className="people-list p-3">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </span>
            </div>
            <input
              value={searchKey}
              type="text"
              className="form-control"
              placeholder="Search Contacts..."
              onChange={(e) => {
                setSearchKey(e.target.value);
              }}
            />
          </div>
          <ul className="list-unstyled chat-list mt-2 mb-0 border h-96">
            {users?.length > 0 ? (
              users.map((val) => (
                <li
                  className="clearfix"
                  key={val._id}
                  onClick={() => {
                    chatHandler(val._id);
                    onClose();
                    toast.success("chat created Ⓜ️");
                  }}
                >
                  <img src={`${prefix}/${val.image}`} alt="avatar" />
                  <div className="about">
                    <div className="name">{val.username}</div>
                    <div className="status">
                      {" "}
                      <i className="fa fa-circle offline" /> {val.email}
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <div>
                <p className="text-center mt-2">No contacts found </p>
              </div>
            )}
          </ul>

          <div>
            <button
              className="w-full bg-red-500 text-white rounded p-3 font-bold"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatModel;
