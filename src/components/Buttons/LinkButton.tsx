import styled from "styled-components";
import BaseButton from "./BaseButton";

const LinkButton = styled(BaseButton)`
  padding-left: 0;
  padding-right: 0;
  border-color: transparent;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.link.primary};

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.link.hover};
  }
`;

export default LinkButton;