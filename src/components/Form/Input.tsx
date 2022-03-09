import React from "react";
import styled from "styled-components";

type InputProps = React.ComponentPropsWithoutRef<"input">;
export type Props = { label?: string; error?: string } & InputProps;

const Input = React.forwardRef<HTMLInputElement, Props>(({ label, error, className, ...props }, ref) => (
  <StyledLabel className={className}>
    <LabelText>{label}</LabelText>
    <StyledInput ref={ref} {...props} />
    {!!error && <Error>{error}</Error>}
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
  border: 1px solid ${({ theme }) => theme.colors.input.border};
  margin-bottom: ${({ theme }) => theme.spacing.xxs};
`;

const Error = styled.span`
  color: ${({ theme }) => theme.colors.input.error};
  font-size: ${({ theme }) => theme.font.xs};
`;

export default Input;