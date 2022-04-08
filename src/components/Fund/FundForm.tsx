import React from "react";
import Form, { FormProps } from "../Form/Form";
import styled from "styled-components";
import SecondaryButton from "../Buttons/SecondaryButton";
import PrimaryButton from "../Buttons/PrimaryButton";

type Props<T> = { labels?: { cancel?: string; submit?: string }; onCancel: () => void } & FormProps<T>;

const FundForm = <T extends Record<string, any> = Record<string, any>>({
  children,
  labels = {},
  onCancel,
  ...props
}: Props<T>) => (
  <StyledForm {...props}>
    {(methods) => (
      <>
        {children(methods)}
        <Actions>
          <SecondaryButton type="button" onClick={onCancel}>
            {labels.cancel ?? "Cancel"}
          </SecondaryButton>
          <PrimaryButton type="submit">{labels.submit ?? "Submit"}</PrimaryButton>
        </Actions>
      </>
    )}
  </StyledForm>
);

export default FundForm;

const StyledForm = styled(Form)`
  > * {
    width: 100%;
  }

  > * + * {
    margin-top: ${({ theme }) => theme.spacing.xlg};
  }

  > :last-child {
    margin-top: ${({ theme }) => theme.spacing.xxlg};
  }
` as typeof Form;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;

  > * + * {
    margin-left: ${({ theme }) => theme.spacing.sm};
  }
`;