export const login = (data: {
  type: string;
  username: string;
  token: string;
}) => {
  return {
    type: "LOGIN",
    username: data.username,
    token: data.token,
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};
