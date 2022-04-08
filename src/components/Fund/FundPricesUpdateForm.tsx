import { Fund, FundPrices } from "../../shared/portfolio";
import Input from "../Form/Input";
import React from "react";
import { inputs } from "../Form/input-props";
import FundForm from "./FundForm";

const toFundPrices = (funds: Fund[]): FundPrices =>
  funds.reduce((prices, { id, price }) => ({ ...prices, [id]: price }), {});

type Props = {
  funds: Fund[];
  onCancel: () => void;
  onSubmit: (prices: FundPrices) => void;
};

const FundPricesUpdateForm = ({ funds, ...props }: Props) => (
  <FundForm<FundPrices> defaultValues={toFundPrices(funds)} labels={{ submit: "Update prices" }} {...props}>
    {({ register, formState: { errors } }) => (
      <>
        {funds.map(({ id, name }) => (
          <Input key={id} error={errors?.[id]?.message} {...inputs.price(register, id)}>
            {name}
          </Input>
        ))}
      </>
    )}
  </FundForm>
);

export default FundPricesUpdateForm;