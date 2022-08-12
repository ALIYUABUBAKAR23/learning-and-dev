import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./assets/css/App.css";
import {
  HashRouter,
  Route,
  Switch,
  Redirect,
  BrowserRouter,
  Router,
} from "react-router-dom";
import AuthLayout from "./layouts/auth";
import AdminLayout from "./layouts/admin";
import RTLLayout from "./layouts/rtl";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/theme";
import { Fragment } from "react";
import SignIn from "./views/auth/signIn";
import Cookies from "js-cookie";

export const UserContext = React.createContext();

function App() {
  //   const [token, setToken] = useState();

  function getToken() {
    const userToken = Cookies.get("token");
    return userToken;
  }

  const token = getToken();

  if (!token) {
    return <SignIn />;
  }
  return (
    <UserContext.Provider value="Reed">
      <Switch>
        <Route path={`/auth`} component={AuthLayout} />
        <Route path={`/admin`} component={AdminLayout} />
        <Route path={`/rtl`} component={RTLLayout} />
        <Redirect from="/" to="/admin" />
      </Switch>
    </UserContext.Provider>
  );
}

export default App;
