import { PropsWithChildren } from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { DEFAULT_THEME } from "./default-theme";
import GlobalStyle from "./global-styles";

type Props = PropsWithChildren<{
  theme?: DefaultTheme;
}>;

const Theme = ({ theme = DEFAULT_THEME, children }: Props) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
);

export default Theme;