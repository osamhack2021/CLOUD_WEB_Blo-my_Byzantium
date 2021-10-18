import { AuthActionType } from "../actions/authActionType";

export const initialState = {
  isAuth: false,
  name: "",
  rank: "",
};

export const AuthReducer = (state = initialState, action: AuthActionType) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuth: true,
        name: action.name,
        rank: action.rank,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuth: false,
        name: "",
        rank: "",
      };
    default:
      return state;
  }
};
