import React, { useEffect } from "react";
import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";
import { useImmerReducer } from "use-immer";
import Footer from "./Footer";
import Header from "./Header";
import HomeGuest from "./HomeGuest";
import Home from "./Home";
import PostAMedia from "./PostAMedia";
import FlashMessage from "../components/FlashMessages";
import Page404 from "./Page404";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Axios from "axios";
Axios.defaults.baseURL =
  process.env.REACT_APP_API_URL;
// || "https://mr-media-backend.herokuapp.com/api"

function App() {
  const initialState = {
    logstate: Boolean(localStorage.getItem("my-media-token")),
    flashMessages: [],
    user: {
      token: localStorage.getItem("my-media-token"),
      email: localStorage.getItem("my-media-email"),
      name: localStorage.getItem("my-media-name"),
      id: localStorage.getItem("my-media-id"),
    }
  };

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);
  useEffect(() => {
    if (state.logstate) {
      localStorage.setItem("my-media-token", state.user.token);
      localStorage.setItem("my-media-email", state.user.email);
      localStorage.setItem("my-media-name", state.user.name);
      localStorage.setItem("my-media-id", state.user.id);
    } else {
      localStorage.removeItem("my-media-token");
      localStorage.removeItem("my-media-email");
      localStorage.removeItem("my-media-name");
      localStorage.removeItem("my-media-id");
    }
    
  }, [state.logstate]);

  function ourReducer(draft, action) {
    switch (action.type) {
      case "logIn":
        draft.logstate = true;
        draft.user = action.data;
        return;
      case "logOut":
        draft.logstate = false;
        return;
      case "flashMessage":
        draft.flashMessages.push(action.value);
        return;
      
      default:
        return draft;
    }
  }

  return (
    <>
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          <BrowserRouter>
            <Header />
            <FlashMessage messages={state.flashMessages} />
            <Switch>
              <Route exact path="/">
                {state.logstate ? <Home /> : <HomeGuest />}
              </Route>
              <Route exact path="/add-media">
                <PostAMedia />
              </Route>
              {/* <Route exact path="/view-media/:id">
                <ViewSingleMedia />
              </Route>
              <Route exact path="/profile/:id">
                <Profile />
              </Route> */}
              <Route exact path="/page404">
                <Page404 />
              </Route>
            </Switch>
            <Footer />
          </BrowserRouter>
        </DispatchContext.Provider>
      </StateContext.Provider>
    </>
  );
}

export default App;
