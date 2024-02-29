import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// react toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import api service
import { postAPI } from "../../services/api";
import Header from "../../components/Header";

const Login = () => {
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await postAPI("user/verify", userDetails);
    if (res.data.success) {
      toast.success(res.data.message);

      // set authToken in localStorage
      localStorage.setItem(
        "authToken",
        JSON.stringify(res.data.data.authToken)
      );
      localStorage.setItem("loggedUserId", JSON.stringify(res.data.data._id));
      navigate("/chat");
    } else {
      toast.error(res.data.message);
    }
  };

  const updateHandler = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Header />
      <div className="bg-blue-50 h-screen flex flex-col pt-20">
        <div className="mb-9">
          <p className="m-0 p-0 text-center text-xl font-bold text-blue-500">
            Login
          </p>
        </div>

        <form className="w-64 mx-auto" onSubmit={(e) => submitHandler(e)}>
          <input
            type="email"
            name="email"
            placeholder="email"
            className=" w-full p-2 mb-2 border rounded"
            required
            onChange={(e) => updateHandler(e)}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            className=" w-full p-2 mb-2 border rounded"
            required
            onChange={(e) => updateHandler(e)}
          />
          <button
            type="submit"
            className=" bg-blue-500 text-white w-full p-2 mb-2 rounded"
          >
            Login
          </button>
        </form>

        <small className="text-center m-0 p-0">
          Not Registered ?{" "}
          <span className="text-blue-500">
            {" "}
            <Link to="/register">Register</Link>
          </span>
        </small>
      </div>
    </>
  );
};

export default Login;
