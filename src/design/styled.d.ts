import "styled-components";

declare module "styled-components" {
  type App = {
    width: string;
  };

  type Colors = {
    background: string;
    button: {
      primary: string;
      primaryOffset: string;
      secondary: string;
      secondaryOffset: string;
      iconLightHover: string;
      iconDarkHover: string;
    };
    link: {
      primary: string;
      hover: string;
    };
    header: {
      background: string;
    };
    fund: {
      background: string;
      border: string;
      positive: string;
      negative: string;
    };
    modal: {
      backdrop: string;
      background: string;
      border: string;
      closeIcon: string;
    };
    input: {
      border: string;
      error: string;
    };
  };

  type Spacing = {
    xxs: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xlg: string;
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
    spacing: Spacing;
    font: Font;
    animations: Animations;
  }
}