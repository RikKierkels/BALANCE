import { DefaultTheme } from "styled-components";

export const defaultTheme: DefaultTheme = {
  app: {
    width: "1020px",
  },
  colors: {
    background: "#f3f3f3",
    button: {
      primary: "#2aad7c",
      primaryOffset: "#ffffff",
      secondary: "#000000",
      secondaryOffset: "#ffffff",
      iconLightHover: "rgba(255,255,255, 0.2)",
      iconDarkHover: "rgba(0,0,0,0.2)",
    },
    header: {
      background: "#ebebeb",
    },
    fund: {
      background: "#ffffff",
      border: "#f3f3f3",
      positive: "#2aad7c",
      negative: "#d4434b",
    },
    modal: {
      background: "#ffffff",
      backdrop: "rgba(0, 0, 0, 0.8)",
      border: "#f3f3f3",
      closeIcon: "#ffffff",
    },
    input: {
      border: "#000000",
      error: "#d4434b",
    },
  },
  spacing: {
    xxs: "0.125rem",
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "2rem",
  },
  font: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "20px",
  },
  animations: {
    easeOutCubic: "cubic-bezier(0.215, 0.61, 0.335, 1)",
  },
};