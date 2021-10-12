import { DefaultTheme } from "styled-components";

export const defaultTheme: DefaultTheme = {
  app: {
    width: "1020px",
  },
  colors: {
    background: "#f3f3f3",
    actions: {
      primary: "#2aad7c",
      primaryOffset: "#ffffff",
      secondary: "",
    },
    header: {
      background: "#ebebeb",
    },
    fund: {
      background: "#ffffff",
      border: "#F3F3F3",
      positive: "#2aad7c",
      negative: "#d4434b",
    },
    modal: {
      background: "#ffffff",
      backdrop: "rgba(235, 235, 235, 0.75)",
    },
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "2rem",
  },
  font: {
    sm: "14px",
    md: "16px",
    lg: "20px",
  },
  animations: {
    easeOutCubic: "cubic-bezier(0.215, 0.61, 0.335, 1)",
  },
};