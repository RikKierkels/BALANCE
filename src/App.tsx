import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { Portfolio } from "./shared/portfolio";
import GlobalStyle from "./design/global-styles";
import { themeDefault } from "./design/theme-default";
import Center from "./components/Center/Center";
import FundListItem from "./components/FundListItem/FundListItem";
import FundList from "./components/FundList/FundList";

function App() {
  const [portfolio, _] = useState<Portfolio>({
    funds: [
      { id: "HSBC World", quantity: 10, price: 10, total: 100, weight: { actual: 0.25, target: 0.5 } },
      { id: "iShares Emerging Markets", quantity: 5, price: 20, total: 100, weight: { actual: 0.25, target: 0.25 } },
      { id: "Vanguard S&P500", quantity: 5, price: 40, total: 200, weight: { actual: 0.5, target: 0.25 } },
    ],
    total: 400,
  });

  return (
    <ThemeProvider theme={themeDefault}>
      <GlobalStyle />
      <Center>
        <FundList>
          {portfolio.funds.map((fund) => (
            <FundListItem fund={fund} />
          ))}
        </FundList>
      </Center>
    </ThemeProvider>
  );
}

export default App;