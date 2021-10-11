import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import FireArmsPage from "./pages/FireArmsPage";
import SelectMenuPage from "./pages/SelectMenuPage";
import Header from "./components/Header";
import { useAuthState, useAuthDispatch } from "./utils/contexts/AuthContext";
import FoodDataPage from "./pages/FoodDataPage";
import ProtectedRoute from "./utils/routes/ProtectedRoute";

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
        <ProtectedRoute exact isAuth={isAuth} path="/fooddata">
          <FoodDataPage />
        </ProtectedRoute>
        <ProtectedRoute exact isAuth={isAuth} path="/firearms">
          <FireArmsPage />
        </ProtectedRoute>
        <Route path="*" render={() => <div>404</div>} />
      </Switch>
    </Router>
  );
}

export default App;
