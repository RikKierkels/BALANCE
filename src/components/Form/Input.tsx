import React from "react";
import styled from "styled-components";

type InputProps = React.ComponentPropsWithoutRef<"input">;
export type Props = { label?: string } & InputProps;

const Input = React.forwardRef<HTMLInputElement, Props>(({ label, ...props }, ref) => (
  <StyledLabel>
    <LabelText>{label}</LabelText>
    <StyledInput ref={ref} {...props} />
  </StyledLabel>
));

const StyledLabel = styled.label``;

const LabelText = styled.span`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StyledInput = styled.input`
  display: block;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.modal.backdrop};
`;

export default Input;