import { DefaultTheme } from "styled-components";

export const defaultTheme: DefaultTheme = {
  app: {
    width: "1020px",
  },
  colors: {
    background: "#f5f3f0",
    text: "#2d3843",
    button: {
      primary: {
        background: "#196BB5",
        text: "#fff",
        border: "transparent",
        outline: "25 107 181",
      },
      secondary: {
        background: "#fff",
        text: "#2d3843",
        border: "transparent",
        outline: "45 56 67  / 16%",
      },
      link: {
        text: "#196BB5",
        hover: "inherit",
        outline: "0 0 0 /0%",
      },
    },
    header: {
      background: "#e1e6ea",
    },
    total: {
      background: "#fff",
    },
    fund: {
      background: "#fff",
      border: "#e1e6ea",
      selected: "#f8fafc",
    },
    increment: {
      positive: "#2aad7c",
      negative: "#d4434b",
    },
    modal: {
      background: "#fff",
      backdrop: "rgba(45, 56, 67, 0.7)",
      border: "#e1e6ea",
    },
    input: {
      background: "#fff",
      text: "inherit",
      border: "#c8d1da",
      error: "#d4434b",
      outline: "45 56 67 / 16%",
      outlineError: "212 67 75",
    },
    checkbox: {
      background: "#fff",
      checked: "#196BB5",
      outline: "45 56 67 / 16%",
    },
    onboarding: {
      background: "#fff",
      icon: "#2d3843",
    },
    shortcut: {
      primary: "#318ee3",
      secondary: "#e1e6ea",
    },
  },
  radius: {
    button: "6px",
    checkbox: "4px",
    input: "6px",
    modal: "6px",
    row: "6px",
    shortcut: "4px",
  },
  spacing: {
    xxs: "0.125rem",
    xs: "0.25rem",
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xlg: "1.5rem",
    xxlg: "2rem",
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