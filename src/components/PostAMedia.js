import Axios from "axios";
import React, { useState, useContext } from "react";
import Page from "./Page";
import { withRouter } from "react-router-dom";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";


const PostAMedia = (props) => {
  const [formData] = useState(new FormData());
  const [values, setValues] = useState({
    mediaTitle: "",
    photo: "",
   // ingredients: "",
    instructions: "",
  });

  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  const handleChange = (name) => (evt,editor) => {
    //const value = name === "photo" ? evt.target.files[0] : evt.target.value;
    let value='';
    if(name === "photo"){
      value = evt.target.files[0];
    }else if(name === "instructions"){
      value = editor.getData();
    }else{
      value = evt.target.value;
    }
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let result = await Axios.post(
        `${Axios.defaults.baseURL}/add-media`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: `${appState.user.token}`,
            email: `${appState.user.email}`,
            ownerid: `${appState.user.id}`,
            ownername: `${appState.user.name}`
          },
        }
      );
      //console.log("ownerId", appState.user.id);
      //console.log("mediaId", result.data);
      if (result.data.error) {
        appDispatch({
          type: "flashMessage",
          value: `Sorry! ${result.data.error[0]}`,
        });
      }
      if (
        result.data === "Sorry you need to be logged in to perform this action"
      ) {
        appDispatch({
          type: "flashMessage",
          value: `${result.data}`
        });
      }

      let id = result.data.newMediaId.insertedId;

      appDispatch({
        type: "flashMessage",
        value: "New media has been saved.",
      });
      props.history.push(`/view-media/${id}`);
    } catch (err) {
      //console.log("Sorry there was an error", err);
    }
  };

  return (
    <Page title="Post A Media">
      <form className="container mt-3" onSubmit={handleSubmit}>
        <div className="mt-1">
          <label htmlFor="media-title" className="mt-1">
            <strong>Media title</strong>
          </label>
          <input
            type="text"
            name="mediaTitle"
            className="media"
            autoFocus
            onChange={handleChange("mediaTitle")}
          />
        </div>
        <div className="mt-1 mb-1">
          <label htmlFor="media-image"><strong>Upload a Media/Sound</strong></label>
          <input
            type="file"
            name="media"
            className="media"
            onChange={handleChange("media")}
          />
        </div>

        <button className="button-yellow media mt-2 mb-3">
          Save this Media
        </button>
      </form>
    </Page>
  );
};

export default withRouter(PostAMedia);
