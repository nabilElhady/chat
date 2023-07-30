import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setdata } from "../store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory

export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); //
  const select = useSelector((item) => item.user);
  const [name, setname] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState(true);
  const reg = async (ev) => {
    ev.preventDefault();
    await axios.post("/register", { name, email, password });
    navigate("/");
  };
  const loggingIn = async (ev) => {
    ev.preventDefault();

    await axios.post("/login", { email, password }).then((response) => {
      if (response.data.message) {
        navigate("/home");
        dispatch(setdata(response.data));
      } else {
        console.log(response);
      }
    });
  };
  return (
    <form
      onSubmit={state ? loggingIn : reg}
      className="flex flex-col justify-center items-center space-y-4 h-screen bg-gray-900"
    >
      <div className="flex flex-col justify-center items-center space-y-12 bg-green-50 px-12 py-4 rounded-2xl">
        <h1
          onClick={() => {
            console.log(select);
          }}
          className="text-4xl font-bold uppercase text-gray-500"
        >
          {state ? "log in" : "sign up"}
        </h1>
        {!state ? (
          <input
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
            type="name"
            placeholder="user"
            className=" shadow-[0_3px_10px_rgb(0,0,0,0.2)] outline-none rounded-full px-4 py-2"
          ></input>
        ) : (
          ""
        )}
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          placeholder="test@gmail.com"
          className=" shadow-[0_3px_10px_rgb(0,0,0,0.2)] outline-none rounded-full px-4 py-2"
        ></input>
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="**********"
          className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] outline-none rounded-full px-4 py-2"
        ></input>
        <button className=" bg-green-200 relative overflow-hidden shadow-[3px_10px_9px_5px_#00000024] rounded-full px-4 py-2 max-w-xs transition duration-300 ease-in-out hover:scale-110 hover:opacity-60 focus:scale-110 outline-none">
          {state ? "log in" : "sign up"}
        </button>
        <p>
          {state ? "don't have acount" : " already have an account"}{" "}
          <span
            className="underline cursor-pointer"
            onClick={() => {
              setState(!state);
            }}
          >
            {" "}
            {state ? "sign up " : "log in"}
          </span>
        </p>
      </div>
    </form>
  );
};
