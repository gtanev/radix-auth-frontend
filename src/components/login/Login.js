import React from "react";
import LoginForm from "./LoginForm";
import FormHeader from "../common/FormHeader";
import FormFooter from "../common/FormFooter";
import { StateContext } from "../../state/hook";

export default function Login(props) {
  return (
    <StateContext.Consumer>
      {([state, dispatch]) => (
        <div className="form-container">
          <FormHeader/>
          <LoginForm location={props.history.location} dispatch={dispatch}/>
          <FormFooter text="Don't have an account?" linkLabel="Sign up" linkTarget="/register"/>
        </div>
      )}
    </StateContext.Consumer>
  );
}