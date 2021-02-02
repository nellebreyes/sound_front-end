import Page from "./Page";
import StateContext from "../StateContext";
import {useContext} from 'react';


const Home = () => {
  const appState = useContext(StateContext);

  return (
    <Page title="Home Page">
      <div className="container mt-2 mb-2">
        <p>Hello and thank you for registering. You can add a sound file using by clicking the 'Add Media link'.</p>
      </div>
     
    </Page>
  );
};

export default Home;
