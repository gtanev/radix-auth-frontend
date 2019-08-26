import React from "react";
import { Button, Container } from "reactstrap";
import { useGlobalState } from "../../state/hook";

export default function Home() {
  const [state, dispatch] = useGlobalState();

  const handleLogout = () => dispatch({ type: "handleSignOut" });

  return (
    <div>
      <Container className="text-center">
        <div className="logo-container">
          <img src={"/radix-logo.png"} alt=""/>
        </div>
        <h1 className="display-4">Hello, <b>{state.user.name}</b>!</h1>
        <p className="lead">Welcome to your Radix dashboard</p>
        <hr className="my-4"/>
        <p>Click the button below to sign out</p>
        <Button id="logoutButton"
                name="logoutButton"
                type="button"
                color="danger"
                outline
                className="w-75"
                onClick={handleLogout}>
          LOGOUT
        </Button>
      </Container>
    </div>
  );
}
