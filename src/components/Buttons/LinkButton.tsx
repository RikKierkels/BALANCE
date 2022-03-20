import styled from "styled-components";
import BaseButton from "./BaseButton";
import { outlineWithoutElevation } from "../../design/mixin";

const LinkButton = styled(BaseButton)`
  padding-left: 0;
  padding-right: 0;
  border-color: transparent;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.button.link.text};
  ${({ theme }) => outlineWithoutElevation(theme.colors.button.link.outline)}

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.button.link.hover};
  }
`;

export default LinkButton;