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
      iconLightHover: string;
      iconDarkHover: string;
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
      closeIcon: string;
    };
  };

  type Spacing = {
    xs: string;
    sm: string;
    md: string;
    lg: string;
  };

  type Font = {
    sm: string;
    md: string;
    lg: string;
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