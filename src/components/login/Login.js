import React from "react";
import LoginForm from "./LoginForm";
import FormHeader from "../common/FormHeader";
import FormFooter from "../common/FormFooter";
import { useGlobalState } from "../../state/hook";

export default function Login(props) {
  const [state, dispatch] = useGlobalState();

  return (
    <div className="form-container">
      <FormHeader/>
      <LoginForm location={props.history.location} globalState={state} dispatch={dispatch}/>
      <FormFooter text="Don't have an account?" linkLabel="Sign up" linkTarget="/register"/>
    </div>
  );
}