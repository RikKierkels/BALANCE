import "styled-components";

declare module "styled-components" {
  type App = {
    width: string;
  };

  type Colors = {
    actions: {
      primary: string;
      secondary: string;
    };
    background: string;
    header: {
      background: string;
    };
    fundRow: {
      background: string;
      positive: string;
      negative: string;
    };
  };

  type Spacing = {
    xs: string;
    sm: string;
    md: string;
    lg: string;
  };

  type Font = {
    sizes: {
      sm: string;
      md: string;
    };
  };

  export interface DefaultTheme {
    app: App;
    colors: Colors;
    spacing: Spacing;
    font: Font;
  }
}