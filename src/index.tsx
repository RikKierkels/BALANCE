import React from "react";
import ReactDOM from "react-dom";
import ModalProvider from "./components/Modal/ModalProvider";
import Theme from "./design/Theme";
import reportWebVitals from "./reportWebVitals";
import AppStateProvider from "./AppStateProvider";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Theme>
      <AppStateProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </AppStateProvider>
    </Theme>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();