import actions from "./actions";

export const initialState = Object.freeze({
  user: null,
  notification: null,
  notificationType: null
});

export const reducer = (state, action) => {
  switch (action.type) {
    case "handleSignIn":
      return actions.handleSignIn(state, action.payload);
    case "handleSignOut":
      return actions.handleSignOut(state, action.payload);
    case "handleNotification":
      return actions.handleNotification(state, action.payload);
    default:
      return state;
  }
};
