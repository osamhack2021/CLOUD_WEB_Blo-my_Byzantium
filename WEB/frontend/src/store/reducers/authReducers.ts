import { AuthActionType } from "../actions/authActionType";

export const initialState = {
  isAuth: false,
  username: "",
  accessToken: "",
};

export const AuthReducer = (state = initialState, action: AuthActionType) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuth: true,
        username: action.username,
        accessToken: action.accessToken,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuth: false,
        username: "",
        accessToken: "",
      };
    default:
      return state;
  }
};
