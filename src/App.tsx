import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { Portfolio } from "./shared/portfolio";
import GlobalStyle from "./styles/globalStyles";
import { theme } from "./styles/themeDefault";

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
    <ThemeProvider theme={theme}>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;