import "styled-components";

declare module "styled-components" {
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
    family: string;
    sizes: {
      md: string;
    };
  };

  export interface DefaultTheme {
    colors: Colors;
    spacing: Spacing;
    font: Font;
  }
}