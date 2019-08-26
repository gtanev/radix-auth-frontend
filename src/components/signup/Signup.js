import React from "react";
import SignupForm from "./SignupForm";
import FormHeader from "../common/FormHeader";
import FormFooter from "../common/FormFooter";
import { StateContext } from "../../state/hook";

export default function Signup() {
  return (
    <StateContext.Consumer>
      {([state, dispatch]) => (
        <div className="form-container">
          <FormHeader/>
          <SignupForm dispatch={dispatch}/>
          <FormFooter text="Already have an account?" linkLabel="Login" linkTarget="/login"/>
        </div>
      )}
    </StateContext.Consumer>
  );
}