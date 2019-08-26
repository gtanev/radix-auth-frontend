import React from "react";
import { Button, Form } from "reactstrap";
import { Envelope, Key } from "react-zondicons";
import FormInputGroup from "../common/FormInputGroup";
import { emailRegex, notificationType } from "../../constants";
import { loginUser } from "../../services/api";
import { Redirect } from "react-router-dom";

export default class LoginForm extends React.Component {
  state = {
    emailInput: "",
    passwordInput: "",
    isValidEmail: null,
    isValidPassword: null,
    redirect: false,
    errorMessage: null,
    isLoginInProgress: false
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value.trim() });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState(prevState => ({
      isValidEmail: emailRegex.test(prevState.emailInput),
      isValidPassword: prevState.passwordInput.length > 0,
      isLoginInProgress: true
    }), this.handleLogin);
  };

  handleLogin = async () => {
    let redirect = false;
    try {
      if (this.state.isValidEmail && this.state.isValidPassword) {
        const response = await loginUser(this.state.emailInput, this.state.passwordInput);
        this.dispatchUser(response);
        redirect = true;
      }
    }
    catch (e) {
      this.dispatchNotification(e.toString());
    } finally {
      this.setState({ isLoginInProgress: false, redirect: redirect })
    }
  };

  dispatchNotification = (message, type = notificationType.fail) => {
    this.props.dispatch({
      type: "handleNotification",
      payload: { notification: message, notificationType: type }
    });
  };

  dispatchUser = (user) => {
    this.props.dispatch({ type: "handleSignIn", payload: user });
  };

  render() {
    const { redirect } = this.state;

    if (redirect) {
      const target = this.props.location.state && this.props.location.state.from
        ? this.props.location.state.from
        : "/";
      return <Redirect to={target}/>
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormInputGroup icon={<Envelope/>}
                        type="email"
                        name="emailInput"
                        valid={this.state.isValidEmail}
                        feedback="Please enter your email address"
                        onChange={this.handleInputChange}/>
        <FormInputGroup icon={<Key/>}
                        type="password"
                        name="passwordInput"
                        valid={this.state.isValidPassword}
                        feedback="Please enter your password"
                        onChange={this.handleInputChange}/>
        <Button id="submitButton"
                name="submitButton"
                type="button"
                color="primary"
                className="w-100"
                disabled={this.state.isLoginInProgress}
                onClick={this.handleSubmit}>
          LOGIN
        </Button>
      </Form>
    );
  };
}
