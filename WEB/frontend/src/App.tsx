import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import FireArmsPage from "./pages/FireArmsPage";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <Route path="/firearms">
          <FireArmsPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
