import React from "react";
import { Alert } from "reactstrap";
import { useGlobalState } from "../../state/hook";
import { notificationType } from "../../constants";

export default function FloatingNotification() {
  const [state, dispatch] = useGlobalState();

  const dismiss = () => dispatch({
    type: "handleNotification",
    payload: { notification: null, notificationType: null }
  });

  const isError = () => state.notificationType === notificationType.fail;

  return (
    <Alert className="notification"
           color={isError() ? "danger" : "primary"}
           isOpen={Boolean(state.notification)}
           toggle={dismiss}>
      {state.notification}
    </Alert>
  );
}
