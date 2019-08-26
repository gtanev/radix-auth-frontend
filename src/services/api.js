import { loginEndpoint, registerEndpoint } from "../constants";

export const loginUser = async (email, password) => {
  const request = {
    body: JSON.stringify({ email, password }),
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
  };

  const response = await fetch(loginEndpoint, request);

  return parseResponse(response);
};

export const registerUser = async (name, email, password) => {
  const request = {
    body: JSON.stringify({ name, email, password }),
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
  };

  const response = await fetch(registerEndpoint, request);

  return parseResponse(response);
};

const parseResponse = async (response) => {
  const parsedResponse = await response.json();

  if (parsedResponse["error"] || parsedResponse["errors"]) {
    throw parseErrors(parsedResponse);
  }

  return parsedResponse;
};

const parseErrors = (response) => {
  return response["message"] || (response["errors"] ? "Invalid credentials" : response.toString());
};
