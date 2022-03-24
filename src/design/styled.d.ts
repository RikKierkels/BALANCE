import "styled-components";

declare module "styled-components" {
  type App = {
    width: string;
  };

  type Colors = {
    background: string;
    text: string;
    button: {
      primary: {
        background: string;
        text: string;
        border: string;
        outline: string;
      };
      secondary: {
        background: string;
        text: string;
        border: string;
        outline: string;
      };
      link: {
        text: string;
        hover: string;
        outline: string;
      };
    };
    header: {
      background: string;
    };
    total: {
      background: string;
    };
    fund: {
      background: string;
      border: string;
      selected: string;
    };
    increment: {
      positive: string;
      negative: string;
    };
    modal: {
      backdrop: string;
      background: string;
      border: string;
    };
    input: {
      background: string;
      border: string;
      text: string;
      error: string;
      outline: string;
      outlineError: string;
    };
    checkbox: {
      background: string;
      checked: string;
      outline: string;
    };
    onboarding: {
      background: string;
      icon: string;
    };
  };

  type Radius = {
    button: string;
    checkbox: string;
    input: string;
    modal: string;
    row: string;
  };

  type Spacing = {
    xxs: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xlg: string;
    xxlg: string;
  };

  type Font = {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xlg: string;
  };

  type Animations = {
    easeOutCubic: string;
  };

  export interface DefaultTheme {
    app: App;
    colors: Colors;
    radius: Radius;
    spacing: Spacing;
    font: Font;
    animations: Animations;
  }
}