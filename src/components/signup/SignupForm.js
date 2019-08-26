import React from "react";
import { Button, Form } from "reactstrap";
import { Envelope, Key, User } from "react-zondicons";
import FormInputGroup from "../common/FormInputGroup";
import { emailRegex, notificationType } from "../../constants";
import { registerUser } from "../../services/api";
import { Redirect } from "react-router-dom";


export default class SignupForm extends React.Component {
  state = {
    nameInput: "",
    emailInput: "",
    passwordInput: "",
    isValidName: null,
    isValidEmail: null,
    isValidPassword: null,
    isEmptyEmail: true,
    isEmptyPassword: true,
    errorMessage: null,
    redirect: false,
    isSignupInProgress: false
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value.trim() });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState(prevState => ({
      isEmptyEmail: prevState.emailInput.length === 0,
      isEmptyPassword: prevState.passwordInput.length === 0,
      isValidEmail: emailRegex.test(prevState.emailInput),
      isValidPassword: prevState.passwordInput.length >= 6,
      isValidName: prevState.nameInput.length > 0,
      isSignupInProgress: true
    }), this.handleSignup);
  };

  handleSignup = async () => {
    let redirect = false;
    try {
      if (this.isFormValid()) {
        const { nameInput, emailInput, passwordInput } = this.state;
        const response = await registerUser(nameInput, emailInput, passwordInput);
        this.dispatchNotification("Registration successful!", notificationType.success);
        redirect = true;
      }
    }
    catch (e) {
      this.dispatchNotification(e.toString(), notificationType.fail);
    } finally {
      this.setState({ isSignupInProgress: false, redirect: redirect })
    }
  };

  dispatchNotification = (message, type = notificationType.fail) => {
    this.props.dispatch({
      type: "handleNotification",
      payload: { notification: message, notificationType: type }
    });
  };

  isFormValid = () => {
    return this.state.isValidName && this.state.isValidEmail && this.state.isValidPassword;
  };

  getValidationFeedback = (inputName) => {
    switch (inputName) {
      case "emailInput":
        return this.state.isEmptyEmail || this.state.isValidEmail
          ? "Please enter your email address"
          : "Please enter a valid email address";
      case "passwordInput":
        return this.state.isEmptyPassword || this.state.isValidPassword
          ? "Please choose a password"
          : "Passwords must contain at least 6 characters";
      default:
        return "";
    }
  };

  render() {
    if (this.state.redirect) return <Redirect to={"/login"}/>;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormInputGroup icon={<User/>}
                        type="text"
                        name="nameInput"
                        valid={this.state.isValidName}
                        feedback="Please enter your name"
                        onChange={this.handleInputChange}/>
        <FormInputGroup icon={<Envelope/>}
                        type="email"
                        name="emailInput"
                        valid={this.state.isValidEmail}
                        feedback={this.getValidationFeedback("emailInput")}
                        onChange={this.handleInputChange}/>
        <FormInputGroup icon={<Key/>}
                        type="password"
                        name="passwordInput"
                        valid={this.state.isValidPassword}
                        feedback={this.getValidationFeedback("passwordInput")}
                        onChange={this.handleInputChange}/>
        <Button id="submitButton"
                name="submitButton"
                type="button"
                color="success"
                className="w-100"
                disabled={this.state.isSignupInProgress}
                onClick={this.handleSubmit}>
          REGISTER
        </Button>
      </Form>
    );
  };
}
