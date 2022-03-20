import styled from "styled-components";
import { Fund, FundPrices } from "../../shared/portfolio";
import Input from "../Form/Input";
import PrimaryButton from "../Buttons/PrimaryButton";
import React from "react";
import { inputs } from "../Form/input-props";
import Form from "../Form/Form";
import SecondaryButton from "../Buttons/SecondaryButton";

const toFundPrices = (funds: Fund[]): FundPrices =>
  funds.reduce((prices, { id, price }) => ({ ...prices, [id]: price }), {});

type Props = {
  funds: Fund[];
  onCancel: () => void;
  onSubmit: (prices: FundPrices) => void;
};

const FundPricesUpdateForm = ({ funds, onCancel, onSubmit }: Props) => (
  <StyledForm<FundPrices> defaultValues={toFundPrices(funds)} onSubmit={onSubmit}>
    {({ register, formState: { errors } }) => (
      <>
        {funds.map(({ id, name }) => (
          <Input key={id} error={errors?.[id]?.message} {...inputs.price(register, id)}>
            {name}
          </Input>
        ))}
        <Actions>
          <SecondaryButton type="button" onClick={onCancel}>
            Cancel
          </SecondaryButton>
          <PrimaryButton type="submit">Update</PrimaryButton>
        </Actions>
      </>
    )}
  </StyledForm>
);

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

export default FundPricesUpdateForm;