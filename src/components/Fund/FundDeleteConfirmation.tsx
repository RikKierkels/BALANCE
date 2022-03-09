import React from "react";
import PrimaryButton from "../Buttons/PrimaryButton";
import SecondaryButton from "../Buttons/SecondaryButton";
import styled from "styled-components";

type Props = {
  onConfirm: () => void;
  onCancel: () => void;
};

const FundDeleteConfirmation = ({ onConfirm, onCancel }: Props) => (
  <ButtonContainer>
    <SecondaryButton onClick={onCancel}>Cancel</SecondaryButton>
    <PrimaryButton onClick={onConfirm}>Remove</PrimaryButton>
  </ButtonContainer>
);

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;

  * + * {
    margin-left: ${({ theme }) => theme.spacing.md};
  }
`;

export default FundDeleteConfirmation;