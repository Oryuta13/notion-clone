import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";

ReactDOM.render(
  // @ts-expect-error TS(2749): 'React.StrictMode' refers to a value, but is being... Remove this comment to see the full error message
  <React.StrictMode>
    // @ts-expect-error TS(2749): 'Provider' refers to a value, but is being used as... Remove this comment to see the full error message
    <Provider store={store}>
      // @ts-expect-error TS(2749): 'App' refers to a value, but is being used as a ty... Remove this comment to see the full error message
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
