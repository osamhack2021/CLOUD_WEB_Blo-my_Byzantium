import React, { useReducer, Dispatch, useContext } from "react";
import { AuthReducer, initialState } from "../../store/reducers/authReducers";
import { AuthActionType } from "../../store/actions/authActionType";

type authState = { isAuth: boolean; name: string; rank: string };
type authDispatch = Dispatch<AuthActionType>;

const AuthContext = React.createContext<authState>({
  isAuth: false,
  name: "",
  rank: "",
});
const AuthDispatchContext = React.createContext<authDispatch | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}

export function useAuthState() {
  const state = useContext(AuthContext);
  if (!state) throw new Error("Cannot find AuthProvider");
  return state;
}

export function useAuthDispatch() {
  const dispatch = useContext(AuthDispatchContext);
  if (!dispatch) throw new Error("Cannot find AuthProvider");
  return dispatch;
}
