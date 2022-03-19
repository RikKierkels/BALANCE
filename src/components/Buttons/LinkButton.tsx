import styled from "styled-components";
import BaseButton from "./BaseButton";

const LinkButton = styled(BaseButton)`
  padding-left: 0;
  padding-right: 0;
  border-color: transparent;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.button.link.text};

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.button.link.hover};
  }
`;

export default LinkButton;