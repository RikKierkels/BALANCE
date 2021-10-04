import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Portfolio } from "./shared/portfolio";

function App() {
  const [portfolio, _] = useState<Portfolio>({
    funds: [
      { id: "HSBC World", quantity: 10, price: 10, weight: { actual: 0.25, target: 0.5 } },
      { id: "iShares Emerging Markets", quantity: 5, price: 20, weight: { actual: 0.25, target: 0.25 } },
      { id: "Vanguard S&P500", quantity: 5, price: 40, weight: { actual: 0.5, target: 0.25 } },
    ],
    total: 400,
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;