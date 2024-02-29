import React from "react";
import "../screens/chat/chat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faRocketchat } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";

const NoChat = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("loggedUserId");
    navigate("/");
  };
  return (
    <>
      <div className="chat-header clearfix">
        <div className="row">
          <div className="col-lg-10">
            <div className=" text-blue-500 bg-blue-100 h-10 flex justify-center items-center rounded mx-1">
              <div className="flex items-center ">
                <p className="m-0 font-bold font-sans p-1">RocketChat</p>
                <FontAwesomeIcon
                  icon={faRocketchat}
                  className="text-blue-500 text-xl"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-2 hidden-sm text-right flex justify-end">
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
      <div className="chat-history flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <FontAwesomeIcon
            icon={faCircleInfo}
            className="border rounded p-2 text-2xl"
          />
          <p className="font-bold font-serif p-2">No Chat Selected</p>
        </div>
      </div>
      <div className="chat-message clearfix h-20"></div>
    </>
  );
};

export default NoChat;
