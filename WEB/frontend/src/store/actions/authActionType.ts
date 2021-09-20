export type AuthActionType =
  | {
      type: "LOGIN";
      isAuth: boolean;
      username: string;
      accessToken: string;
    }
  | { type: "LOGOUT" };
