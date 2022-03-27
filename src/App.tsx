import React from "react";
import Portfolio from "./components/Portfolio/Portfolio";
import Onboarding from "./components/Common/Onboarding";
import { useAppState } from "./AppStateProvider";

const App = () => {
  const [{ portfolio }] = useAppState();
  return !!portfolio.funds.length ? <Portfolio /> : <Onboarding />;
};

export default App;