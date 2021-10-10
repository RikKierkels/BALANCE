import { DefaultTheme } from "styled-components";

export const themeDefault: DefaultTheme = {
  colors: {
    background: "#F3F3F3",
    actions: {
      primary: "#2AAD7C",
      secondary: "",
    },
    header: {
      background: "#EBEBEB",
    },
    fundRow: {
      background: "#FFFFFF",
      positive: "#2AAD7C",
      negative: "#D4434B",
    },
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "2rem",
  },
  font: {
    family: "'Fira Sans', 'Helvetica Neue', sans-serif",
    sizes: {
      md: "16px",
    },
  },
};