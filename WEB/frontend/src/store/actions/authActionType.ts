export type AuthActionType =
  | {
      type: "LOGIN";
      isAuth: boolean;
      name: string;
      rank: string;
    }
  | { type: "LOGOUT" };
