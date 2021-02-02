import Axios from "axios";
import React, { useState, useContext } from "react";
import DispatchContext from "../DispatchContext";

  
const LogIn = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const appDispatch = useContext(DispatchContext);

  async function login() {
    try {
      const response = await Axios.post(`${Axios.defaults.baseURL}/login`, {
        email,
        password,
      });
      if (response.data.error === "email not found") {
        //console.log("Login", response.data);
        appDispatch({ type: "default" });
        appDispatch({
          type: "flashMessage",
          value: "Invalid username or password",
        });
        return;
      }
      appDispatch({ type: "logIn", data: response.data });
    } catch (e) {
      console.log(e);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    login();
  }

  return (
    <div className="login mt-1">
      <div className="content">
        <p className="Sacramento">
          {" "}
         Welcome! This app allows you to upload your favorite media.
        </p>
        <hr className="mb-2" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="email mb-1">
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            required
            autoComplete="off"
          />
        </div>
        <div className="password mb-1">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            required
            autoComplete="off"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button className="button-yellow">Log In</button>
      </form>
    </div>
  );
};

export default LogIn;
