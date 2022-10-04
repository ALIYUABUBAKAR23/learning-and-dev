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
import ResourcesLayout from "./layouts/resources";
import {UserContextProvider} from "./contexts/UserContext"

function App() {
  
  const [user, setUser] = useState({});

  function getToken() {
    const userToken = Cookies.get("token");
    return userToken;
  }

  const token = getToken();

  // const setUser= (user) => {
  //   const loggedInUser = { ...user }
  //   console.log("setting user for all...")
  //   console.log(loggedInUser)
    
  //   return loggedInUser
  // }
    
  // const loggedInUser = setUser();
  const testUser = {"id": 3,
                        "email": "b@gmail.com",
                        "first_name": "Hafsah",
                        "last_name": "Babyn",
                        "middle_name": "B",
                        "sex": "female",
                        "state_of_origin": "Kaduna",
                        "address": "Bakinzuwo Kano",
                        "phone_number": "+2349039389643",
                        "twitter": "jkjkjk.com",
                        "tnstagram": "njnjn.com",
                        "linkedIn": "njnjij.com",
                        "staff_id": "1233",
                        "commencement_date": "2022-09-21",
                        "salary": 2,
                        "role": "jjjjxhxjxjjxnx",
                        "bank_name": "xhxxnxnhxnxh",
                        "bank_account": "aaaa",
                        "department": "The department",
                        "spouse_name": "jsjjsjs",
                        "date_of_birth": "2022-09-16",
                        "is_married": true
                    }

  
  if (!token) {
    return <SignIn setUser={setUser}/>;
  }

  return (
      <UserContextProvider value={user}> 
        <Switch>
          <Route path={`/auth`} component={AuthLayout} />
          <Route path={`/admin`} component={AdminLayout} />
          <Route path={`/rtl`} component={RTLLayout} />
          <Route path={`/resources`} component={ResourcesLayout} />
          <Redirect from="/" to="/admin" />
        </Switch>
      </UserContextProvider>
  );
}

export default App;
