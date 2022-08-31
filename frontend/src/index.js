import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/App.css";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/theme";
import App from "./App";
import toast, { Toaster } from 'react-hot-toast';// import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <BrowserRouter>
        <Toaster />
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById("app")
);
