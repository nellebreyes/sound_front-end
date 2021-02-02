import Axios from "axios";
import React, {useContext, useState} from "react";
import DispatchContext from "../DispatchContext";

Axios.defaults.baseURL = process.env.REACT_APP_API_URL;


const Signup = () => {
  const [firstName, setFirstName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const appDispatch = useContext(DispatchContext);

  async function signup() {
    try {
      const response = await Axios.post(`${Axios.defaults.baseURL}/register`, {
        firstName,
        email,
        password,
        confirmPassword,
      });
      if (response.data) {
       // console.log("You have successfully registered", response);
       //console.log(response.data)
       window.scrollTo(0,0);
       appDispatch({
        type: "flashMessage",
        value: response.data.result || response.data },
      );
      return;
      }
    } catch (e) {
      console.log(e);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    signup();
  }

  
  return (
    <>
      <hr className="mt-2" />
      <h2 className="center">Sign up</h2>
      <hr className="mb-2" />
      <form onSubmit={handleSubmit} className="signup">
        <div className="col-1">
          <div className="firstName mb-1"  >
            <label htmlFor="firstName">First Name</label>
            <input
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              type="text"
              required
              autoComplete="off"
              id="firstName"
            />
          </div>
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
        </div>
        <div className="col-2">
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
          <div className="confirmPassword mb-1">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              required
              autoComplete="off"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <button className="button-yellow mb-3" id="signup">Sign up</button>
      </form>
    </>
  );
};

export default Signup;
