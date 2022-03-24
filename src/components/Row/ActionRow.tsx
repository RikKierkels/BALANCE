import React, { PropsWithChildren, useState } from "react";
import Checkbox from "../Form/Checkbox";
import Row from "./Row";
import styled, { css } from "styled-components";
import { outlineWithoutElevation } from "../../design/mixin";

export type Props = PropsWithChildren<{
  labels: {
    checkbox: string;
    button?: string;
  };
  isSelected: boolean;
  onSelectedChange: () => void;
  onClick?: () => void;
}>;

const ActionRow = ({ children, labels, isSelected, onSelectedChange, onClick, ...props }: Props) => {
  const [isActionFocussed, setIsActionFocussed] = useState(false);
  const label = `${isSelected ? "Deselect" : "Select"} ${labels.checkbox}`;

  return (
    <StyledRow isActionFocussed={isActionFocussed} {...props}>
      <CenteredCheckbox aria-label={label} title={label} checked={isSelected} onChange={onSelectedChange} />
      <Action
        as={onClick ? "button" : "div"}
        {...(onClick ? { "aria-label": labels.button, onClick } : {})}
        onFocus={() => setIsActionFocussed(true)}
        onBlur={() => setIsActionFocussed(false)}
      >
        {children}
      </Action>
    </StyledRow>
  );
};

const StyledRow = styled(Row)<{ isActionFocussed: boolean }>`
  position: relative;
  ${({ isActionFocussed }) =>
    isActionFocussed &&
    css`
      z-index: 1;
      ${outlineWithoutElevation("0 0 0 / 0%")}
    `}
`;

const CenteredCheckbox = styled(Checkbox)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Action = styled.button`
  > * {
    text-align: end;
  }

  > *:first-child {
    text-align: start;
  }

  > *:nth-child(2),
  > *:nth-child(3) {
    text-align: center;
  }

  &:focus {
    outline: 0;
  }
`;

export default ActionRow;