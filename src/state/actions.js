import { notificationType } from "../constants";

export default {
  handleSignIn: (state, payload) => {
    return {
      ...state,
      user: payload,
      notification: null,
      notificationType: null
    };
  },

  handleSignOut: (state, payload) => {
    return {
      ...state,
      user: null,
      notification: "Logged out successfully.",
      notificationType: notificationType.success
    };
  },

  handleNotification: (state, payload) => {
    return {
      ...state,
      notification: payload.notification,
      notificationType: payload.notificationType
    };
  },
};
