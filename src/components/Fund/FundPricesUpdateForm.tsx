import styled from "styled-components";
import { Fund, FundPrices } from "../../shared/portfolio";
import Input from "../Form/Input";
import PrimaryButton from "../Buttons/PrimaryButton";
import React from "react";
import { inputs } from "../Form/input-props";
import Form from "../Form/Form";

const toFundPrices = (funds: Fund[]): FundPrices =>
  funds.reduce((prices, { id, price }) => ({ ...prices, [id]: price }), {});

type Props = {
  funds: Fund[];
  onSubmit: (prices: FundPrices) => void;
};

const FundPricesUpdateForm = ({ funds, onSubmit }: Props) => (
  <StyledForm<FundPrices> defaultValues={toFundPrices(funds)} onSubmit={onSubmit}>
    {({ register, formState: { errors } }) => (
      <>
        {funds.map((fund) => (
          <Input
            key={fund.id}
            label={fund.name}
            error={errors?.[fund.id]?.message}
            {...inputs.price(register, fund.id)}
          />
        ))}
        <StyledPrimaryButton type="submit">Save</StyledPrimaryButton>
      </>
    )}
  </StyledForm>
);

const StyledForm = styled(Form)`
  > * + * {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
` as typeof Form;

const StyledPrimaryButton = styled(PrimaryButton)`
  width: 100%;
`;

export default FundPricesUpdateForm;