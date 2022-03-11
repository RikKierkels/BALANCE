import React from "react";
import PrimaryButton from "../Buttons/PrimaryButton";
import SecondaryButton from "../Buttons/SecondaryButton";
import styled from "styled-components";

type Props = {
  onConfirm: () => void;
  onCancel: () => void;
};

const FundDeleteConfirmation = ({ onConfirm, onCancel }: Props) => (
  <Confirmation>
    <p>This will permanently remove the fund(s) and re-balance the portfolio. This action cannot be undone.</p>
    <Actions>
      <SecondaryButton onClick={onCancel}>Cancel</SecondaryButton>
      <PrimaryButton onClick={onConfirm}>Delete</PrimaryButton>
    </Actions>
  </Confirmation>
);

const Confirmation = styled.div`
  > *:last-child {
    margin-top: ${({ theme }) => theme.spacing.lg};
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;

  * + * {
    margin-left: ${({ theme }) => theme.spacing.sm};
  }
`;

export default FundDeleteConfirmation;