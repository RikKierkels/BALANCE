import { css } from "styled-components";

export const outlineWithElevation = (color: string) => css`
  outline: 0;
  box-shadow: rgb(0 0 0 / 0%) 0 0 0 0, rgb(0 0 0 / 0%) 0 0 0 0, rgb(0 0 0 / 12%) 0 1px 1px 0, rgb(${color}) 0 0 0 1px,
    rgb(0 0 0 / 0%) 0 0 0 0, rgb(0 0 0 / 0%) 0 0 0 0, rgb(45 56 67 / 8%) 0 2px 5px 0;

  &:hover {
    box-shadow: rgb(0 0 0 / 0%) 0 0 0 0, rgb(0 0 0 / 0%) 0 0 0 0, rgb(0 0 0 / 12%) 0 1px 1px 0, rgb(${color}) 0 0 0 1px,
      rgb(0 0 0 / 0%) 0 0 0 0, rgb(45 56 67 / 8%) 0 3px 9px 0, rgb(45 56 67 / 8%) 0 2px 5px 0;
  }

  &:focus {
    box-shadow: rgb(0 0 0 / 0%) 0 0 0 0, rgb(1 150 237 / 36%) 0 0 0 4px, rgb(0 0 0 / 12%) 0 1px 1px 0,
      rgb(${color}) 0 0 0 1px, rgb(0 0 0 / 0%) 0 0 0 0, rgb(0 0 0 / 0%) 0 0 0 0, rgb(45 56 67 / 8%) 0 2px 5px 0;
  }
`;

export const outlineWithoutElevation = (color: string) => css`
  outline: 0;
  box-shadow: rgb(0 0 0 / 0%) 0 0 0 0, rgb(0 0 0 / 0%) 0 0 0 0, rgb(0 0 0 / 0%) 0 0 0 0, rgb(${color}) 0 0 0 1px,
    rgb(0 0 0 / 0%) 0 0 0 0, rgb(0 0 0 / 0%) 0 0 0 0, rgb(0 0 0 / 0%) 0 0 0 0;

  &:focus,
  &:focus-within {
    box-shadow: rgb(0 0 0 / 0%) 0 0 0 0, rgb(1 150 237 / 36%) 0 0 0 4px, rgb(0 0 0 / 12%) 0 1px 1px 0,
      rgb(${color}) 0 0 0 1px, rgb(0 0 0 / 0%) 0 0 0 0, rgb(0 0 0 / 0%) 0 0 0 0, rgb(0 0 0 / 0%) 0 0 0 0;
  }
`;