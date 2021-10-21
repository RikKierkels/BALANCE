import React from "react";
import styled from "styled-components";

type InputProps = React.ComponentPropsWithoutRef<"input">;
export type Props = { label?: string } & InputProps;

const Input = React.forwardRef<HTMLInputElement, Props>(({ label, className, ...props }, ref) => (
  <StyledLabel className={className}>
    <LabelText>{label}</LabelText>
    <StyledInput ref={ref} {...props} />
  </StyledLabel>
));

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
`;

const LabelText = styled.span`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StyledInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.modal.backdrop};
`;

export default Input;