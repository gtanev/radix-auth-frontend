import React from "react";
import "../styles/app.scss";
import { MemoryRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./home/Home";
import Login from "./login/Login";
import Signup from "./signup/Signup";
import FloatingNotification from "./common/FloatingNotification";
import { useGlobalState } from "../state/hook";

export default function AppRouter() {
  return (
    <MemoryRouter>
      <div className="app">
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Signup}/>
          <PrivateRoute exact path="/" component={Home}/>
        </Switch>
        <FloatingNotification/>
      </div>
    </MemoryRouter>
  );
}

const PrivateRoute = ({ ...props }) => {
  const [state] = useGlobalState();

  return state.user
    ? <Route {...props} />
    : <Redirect to={{ pathname: "/login", state: { from: props.location } }}/>;
};
