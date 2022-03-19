import { DefaultTheme } from "styled-components";

export const defaultTheme: DefaultTheme = {
  app: {
    width: "1020px",
  },
  colors: {
    background: "#fefbf6",
    text: "#000000",
    button: {
      primary: {
        background: "#0d4b82",
        text: "#ffffff",
        border: "#0d4b82",
      },
      secondary: {
        background: "#fff",
        text: "#313131",
        border: "#0d4b82",
      },
      link: {
        text: "#0d4b82",
        hover: "inherit",
      },
      iconLightHover: "rgba(255,255,255, 0.2)",
      iconDarkHover: "rgba(0,0,0,0.2)",
    },
    header: {
      background: "#e6f0f9",
    },
    total: {
      background: "#fff",
    },
    fund: {
      background: "#fff",
      border: "#f3f3f3",
      selected: "#f7fafd",
    },
    increment: {
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
      background: "#ffffff",
      border: "#7a7a7a",
      error: "#d4434b",
    },
    checkbox: {
      background: "#ffffff",
      border: "#000000",
      checked: "#0d4b82",
    },
  },
  radius: {
    button: "6px",
    checkbox: "3px",
    input: "3px",
    modal: "6px",
    row: "6px",
  },
  spacing: {
    xxs: "0.125rem",
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xlg: "2rem",
  },
  font: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xlg: "20px",
  },
  animations: {
    easeOutCubic: "cubic-bezier(0.215, 0.61, 0.335, 1)",
  },
};