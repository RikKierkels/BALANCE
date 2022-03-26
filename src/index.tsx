import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Theme from "./design/Theme";
import ModalProvider from "./components/Modal/ModalProvider";
import AppOnboarding from "./AppOnboarding";
import AppStateProvider, { useAppState } from "./AppStateProvider";

const Index = () => {
  const [{ portfolio }] = useAppState();
  return !!portfolio.funds.length ? <App /> : <AppOnboarding />;
};

ReactDOM.render(
  <React.StrictMode>
    <Theme>
      <AppStateProvider
        initialState={{
          selectedFundIds: [],
          amount: undefined,
          portfolio: { funds: [], total: 0 },
          increment: null,
        }}
      >
        <ModalProvider>
          <Index />
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