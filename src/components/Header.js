import React, { useContext } from "react";
import HeaderIsLoggedIn from "./HeaderIsLoggedIn";
import HeaderIsLoggedOut from "./HeaderIsLoggedOut";
import StateContext from "../StateContext";

const Header = () => {
  const appState = useContext(StateContext);
  return (
    <div className="header">
      <div className="container">
        <h1 className="logo" id="logo">
          <a href="/">Sound&nbsp;App</a>
        </h1>
        {appState.logstate ? <HeaderIsLoggedIn /> : <HeaderIsLoggedOut />}
      </div>
    </div>
  );
};
export default Header;
