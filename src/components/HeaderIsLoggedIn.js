import React, { useContext } from "react";
import { Link } from "react-router-dom";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";

const HeaderIsLoggedIn = () => {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  function signout() {
    appDispatch({ type: "logOut" });
  }

  return (
    <div className="logged-in">
      <Link onClick={signout} to="/">
        Sign&nbsp;Out
      </Link>
      <Link to="/add-media">Add&nbsp;Media</Link>
      {/* <Link to={`/profile/${appState.user.id}`}>My&nbsp;Profile</Link> */}
      <Link to="/">Home</Link>
    </div>
  );
};

export default HeaderIsLoggedIn;
