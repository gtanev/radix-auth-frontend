import React from "react";
import SignupForm from "./SignupForm";
import FormHeader from "../common/FormHeader";
import FormFooter from "../common/FormFooter";
import { useGlobalState } from "../../state/hook";

export default function Signup() {
  const [state, dispatch] = useGlobalState();

  return (
    <div className="form-container">
      <FormHeader/>
      <SignupForm globalState={state} dispatch={dispatch}/>
      <FormFooter text="Already have an account?" linkLabel="Login" linkTarget="/login"/>
    </div>
  );
}