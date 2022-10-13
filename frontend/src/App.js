import React, { useState } from "react";
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
// import ResourcesLayout from "./layouts/resources";
import {UserContextProvider} from "./contexts/UserContext"

function App() {

  function getToken() {
    const userToken = Cookies.get("token");
    return userToken;
  }

  const token = getToken();

  function getUser() {
    const user = JSON.parse(localStorage.getItem("user"))
    return user;
  }

  const loggedInUser = getUser();

  
   if (!token) {
     return <SignIn />;
   }

  return (
      <UserContextProvider value={loggedInUser}> 
        <Switch>
          <Route path={`/auth`} component={AuthLayout} />
          <Route path={`/admin`} component={AdminLayout} />
          <Route path={`/rtl`} component={RTLLayout} />
          {/* <Route path={`/resources`} component={ResourcesLayout} /> */}
          <Redirect from="/" to="/admin" />
        </Switch>
      </UserContextProvider>
  );
}

export default App;
