import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocketchat } from "@fortawesome/free-brands-svg-icons";

const Header = () => {
  return (
    <>
      <div className="w-full bg-blue-500 h-10 flex justify-center items-center absolute">
        <div className="flex items-center ">
          <p className="m-0 text-white font-bold font-sans p-3">RocketChat</p>
          <FontAwesomeIcon
            icon={faRocketchat}
            className="text-white text-2xl"
          />
        </div>
      </div>
    </>
  );
};

export default Header;
