import LogIn from "./LogIn";
import Page from "./Page";
import Signup from "./Signup";
import {useContext} from 'react';
import StateContext from "../StateContext";
import LoadingDots from "./LoadingDots";


const HomeGuest = () => {

  const appState = useContext(StateContext);

  return (
    <Page title="Guest Home-Page">
      <div className="container">
        <LogIn />
        <Signup />
      </div>
    </Page>
  );
};

export default HomeGuest;
