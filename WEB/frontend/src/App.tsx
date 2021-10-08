import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import FireArmsPage from "./pages/FireArmsPage";
import SelectMenuPage from "./pages/SelectMenuPage";
import Header from "./components/Header";
import { useAuthState, useAuthDispatch } from "./utils/contexts/AuthContext";

function App() {
  const { isAuth } = useAuthState();
  const authDispatch = useAuthDispatch();
  useEffect(() => {
    const loginStatus = window.localStorage.getItem("isAuth");
    if (loginStatus !== null) {
      authDispatch({
        type: "LOGIN",
        username: "",
        accessToken: "",
        isAuth: JSON.parse(loginStatus),
      });
    }
  }, []);
  return (
    <Router>
      {isAuth && <Header />}
      <Switch>
        <Route exact path="/">
          {isAuth ? <SelectMenuPage /> : <LoginPage />}
        </Route>
        <Route path="/firearms">
          <FireArmsPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
