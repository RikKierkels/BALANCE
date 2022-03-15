import React, { PropsWithChildren } from "react";
import Checkbox from "../Form/Checkbox";
import Row from "./Row";
import styled from "styled-components";

type Props = PropsWithChildren<{
  labels: {
    checkbox: string;
    button?: string;
  };
  isSelected: boolean;
  onSelectedChange: () => void;
  onClick?: () => void;
}>;

const ActionRow = ({ children, labels, isSelected, onSelectedChange, onClick, ...props }: Props) => {
  const label = `${isSelected ? "Deselect" : "Select"} ${labels.checkbox}`;

  return (
    <Row {...props}>
      <CenteredCheckbox aria-label={label} title={label} checked={isSelected} onChange={onSelectedChange} />
      <Action as={onClick ? "button" : "div"} {...(onClick ? { "aria-label": labels.button, onClick } : {})}>
        {children}
      </Action>
    </Row>
  );
};

const CenteredCheckbox = styled(Checkbox)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Action = styled.button`
  &:focus {
    outline: 0;
  }
`;

export default ActionRow;