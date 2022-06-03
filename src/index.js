import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { ApolloProvider } from "@apollo/client";
import client from "./api/graphql/index";

import "./index.css";
import App from "./App";

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById("root")
);
