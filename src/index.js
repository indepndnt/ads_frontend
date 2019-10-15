import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { unregister } from "./registerServiceWorker";

import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";
import root from "./store/reducers/root";

const store = createStore(root, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// registerServiceWorker();
unregister();
