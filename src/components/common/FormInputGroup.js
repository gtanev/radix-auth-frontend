import React from "react";
import {
  FormFeedback, FormGroup, FormText, Input, InputGroup, InputGroupAddon, InputGroupText
} from "reactstrap";


export default function FormInputGroup({ type, name, icon, valid, placeholder, onChange, feedback }) {
  return (
    <FormGroup>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText className={
            valid === false
              ? "border border-danger"
              : valid === true
              ? "border border-success"
              : ""
          }>
            {React.cloneElement(icon, { size: 16 })}
          </InputGroupText>
        </InputGroupAddon>
        <Input type={type} name={name} id={name}
               className={
                 valid === false
                   ? "form-control is-invalid"
                   : valid === true
                   ? "form-control is-valid"
                   : ""
               }
               onPaste={e => e.preventDefault()}
               onChange={onChange}/>
        <FormFeedback valid={false}>{feedback}</FormFeedback>
      </InputGroup>
      {valid === null || valid ? <FormText>{feedback}</FormText> : null}
    </FormGroup>
  );
}
