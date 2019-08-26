import React from "react";
import { Label } from "reactstrap";
import { Link } from "react-router-dom";

export default function FormFooter({ text, linkLabel, linkTarget }) {
  return (
    <Label className="form-label mt-4">
      {text}
      <Link to={{ pathname: linkTarget }}
            className="text-link mx-1">
        {linkLabel}
      </Link>
    </Label>
  );
}
