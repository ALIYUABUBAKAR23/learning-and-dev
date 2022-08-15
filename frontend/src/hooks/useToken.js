import Cookies from "js-cookie";
import { useState } from "react";

export default function useToken() {

  const getToken = () => {
    const token = Cookies.get("token");
    console.log("token: ", token);
    return token;
  };

  const [token, setToken] = useState();

  const saveToken = (key) => {
    Cookies.set("token", key, { expires: inHalfADay });
    setToken(key);
  };

  return {
    setToken: saveToken,
    token
  }

}
