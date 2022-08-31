import React from "react";
import "./assets/css/App.css";
import {
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import AuthLayout from "./layouts/auth";
import AdminLayout from "./layouts/admin";
import RTLLayout from "./layouts/rtl";
import SignIn from "./views/auth/signIn";
import Cookies from "js-cookie";
import ResourcesLayout from "./layouts/resources";

function App() {
  function getToken() {
    const userToken = Cookies.get("token");
    return userToken;
  }

  const token = getToken();

  if (!token) {
    return <SignIn />;
  }
  
  return (
      <Switch>
        <Route path={`/auth`} component={AuthLayout} />
        <Route path={`/admin`} component={AdminLayout} />
        <Route path={`/rtl`} component={RTLLayout} />
        <Route path={`/resources`} component={ResourcesLayout} />
        <Redirect from="/" to="/admin" />
      </Switch>
  );
}

export default App;
