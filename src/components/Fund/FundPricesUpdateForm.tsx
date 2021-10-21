import styled from "styled-components";
import { Fund, FundPrices } from "../../shared/portfolio";
import Form from "../Form/Form";
import Input from "../Form/Input";
import PrimaryButton from "../Buttons/PrimaryButton";
import React from "react";

const toFundPrices = (funds: Fund[]): FundPrices =>
  funds.reduce((prices, { id, price }) => ({ ...prices, [id]: price }), {});

type Props = {
  funds: Fund[];
  onSubmit: (prices: FundPrices) => void;
};

const FundPricesUpdateForm = ({ funds, onSubmit }: Props) => (
  <StyledForm<FundPrices> defaultValues={toFundPrices(funds)} onSubmit={onSubmit}>
    {({ register }) => (
      <>
        {funds.map((fund) => (
          <StyledInput
            key={fund.id}
            type="number"
            step="0.001"
            label={fund.name}
            {...register(fund.id, { required: true, min: 0, valueAsNumber: true })}
          />
        ))}
        <StyledPrimaryButton type="submit">Save</StyledPrimaryButton>
      </>
    )}
  </StyledForm>
);

const StyledForm = styled(Form)`
  > *:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
` as typeof Form;

const StyledInput = styled(Input)`
  display: flex;
  flex-direction: row;

  > * {
    display: flex;
    align-items: center;
    flex: 50%;
  }
`;

const StyledPrimaryButton = styled(PrimaryButton)`
  width: 100%;
`;

export default FundPricesUpdateForm;