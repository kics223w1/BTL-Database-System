import axios from "axios";
import React, { useState } from "react";
import { BACKEND_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [textAccount, setTextAccount] = useState("");
  const [textPassword, setTextPassword] = useState("");
  const [isInvalidAccount, setIsInvalidAccount] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const navigate = useNavigate();

  const handleOnSignIn = async () => {
    if (textAccount.length === 0) {
      setIsInvalidAccount(true);
      return;
    }

    if (textPassword.length <= 8) {
      setIsInvalidPassword(true);
      return;
    }

    setIsInvalidAccount(false);
    setIsInvalidPassword(false);

    navigate("/");

    // const response = await axios.post(`${BACKEND_URL}/login`, {
    //   account: textAccount,
    //   password: textPassword,
    // });
  };

  return (
    <div className="container-max flex flex-col items-center justify-center gap-1 w-full h-[800px]">
      <span className="text-lg w-96 text-start font-medium">Account</span>
      <input
        placeholder="Type your account..."
        className="p-2 px-4 rounded-md border outline-none border-orange-400 w-96 h-10"
        onChange={(e) => {
          const text = e.target.value.trim();
          setTextAccount(text);
        }}
      />
      {isInvalidAccount && (
        <span className="text-red-400 text-sm w-96 text-start font-medium">
          Account can not be empty
        </span>
      )}
      <span className="text-lg w-96 text-start font-medium mt-1">Password</span>
      <input
        placeholder="Type your password..."
        className="p-2 px-4 rounded-md border outline-none border-orange-400 w-96 h-10"
        onChange={(e) => {
          const text = e.target.value.trim();
          setTextPassword(text);
        }}
      />
      {isInvalidPassword && (
        <span className="text-red-400 text-sm w-96 text-start font-medium">
          Password length must greater than 8
        </span>
      )}
      <div className="flex items-center gap-1 w-96 mt-4 ">
        <button className="bg-orange-600 w-1/2 py-1 font-medium text-base text-center rounded hover:bg-orange-400">
          Sign up
        </button>
        <button
          onClick={handleOnSignIn}
          className="bg-orange-600 w-1/2 py-1 font-medium text-base text-center rounded hover:bg-orange-400"
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Login;
