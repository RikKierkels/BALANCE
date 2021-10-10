import { DefaultTheme, ThemeProvider } from "styled-components";
import { PropsWithChildren } from "react";
import { defaultTheme } from "./default-theme";
import GlobalStyle from "./global-styles";

type Props = PropsWithChildren<{
  theme?: DefaultTheme;
}>;

const Theme = ({ theme = defaultTheme, children }: Props) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
);

export default Theme;