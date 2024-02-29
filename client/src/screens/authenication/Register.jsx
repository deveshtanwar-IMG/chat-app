import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postAPI } from "../../services/api";

// react toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/Header";

const Register = () => {
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await postAPI("user/register", userDetails);
    if (res.data.success) {
      toast.success(res.data.message);
      navigate("/");
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
            Register
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
            type="text"
            name="username"
            placeholder="username"
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
            Register
          </button>
        </form>

        <small className="text-center m-0 p-0">
          Already Registered ?{" "}
          <span className="text-blue-500">
            {" "}
            <Link to="/">SignIn</Link>
          </span>
        </small>
      </div>
    </>
  );
};

export default Register;
