import React from "react";
import styled from "styled-components";
import { ReactComponent as WarningIcon } from "../../assets/warning.svg";
import { outlineWithElevation, outlineWithoutElevation } from "../../design/mixin";

type InputProps = React.ComponentPropsWithoutRef<"input">;
type Props = React.PropsWithChildren<{ error?: string } & InputProps>;

const Input = React.forwardRef<HTMLInputElement, Props>(({ children, className, error, ...props }, ref) => (
  <StyledLabel className={className}>
    <span>{children}</span>
    <StyledInput ref={ref} aria-invalid={!!error ? "true" : "false"} hasError={!!error} {...props} />
    {!!error && (
      <Error>
        <ErrorIcon />
        <ErrorMessage role="alert">{error}</ErrorMessage>
      </Error>
    )}
  </StyledLabel>
));

const StyledLabel = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.font.sm};

  > * {
    width: 100%;
  }

  > * + * {
    margin-top: ${({ theme }) => theme.spacing.sm};
  }

  > :nth-child(2) {
    margin-top: ${({ theme }) => theme.spacing.md};
  }
`;

const StyledInput = styled.input<{ hasError: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.input};
  color: ${({ theme }) => theme.colors.input.text};
  outline: 0;
  ${({ theme, hasError }) =>
    outlineWithoutElevation(hasError ? theme.colors.input.outlineError : theme.colors.input.outline)}
`;

const Error = styled.div`
  display: block;
  vertical-align: center;

  > *:first-child {
    vertical-align: -0.05em;
    margin-inline-end: 0.5em;
  }
`;

const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.input.error};
  font-size: 1em;
`;

const ErrorIcon = styled(WarningIcon)`
  height: 0.75em;
  width: 0.75em;
  fill: ${({ theme }) => theme.colors.input.error};
`;

export default Input;