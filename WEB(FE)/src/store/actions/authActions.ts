export const login = (data: { name: string; rank: string }) => {
  return {
    type: "LOGIN",
    name: data.name,
    rank: data.rank,
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};
