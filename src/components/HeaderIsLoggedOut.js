import React from "react";
import {Link} from "react-router-dom";

const HeaderIsLoggedOut = () => {
 
  return (
    <div className="nav-links">
      <Link to="/">Home</Link>
    </div>
  );
};

export default HeaderIsLoggedOut;
