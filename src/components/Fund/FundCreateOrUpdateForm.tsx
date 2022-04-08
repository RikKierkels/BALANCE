import React, { useCallback } from "react";
import { Fund, FundCreateOrUpdate } from "../../shared/portfolio";
import Input from "../Form/Input";
import { inputs } from "../Form/input-props";
import FundForm from "./FundForm";

const fromFactorToPercentage = (factor: number) => factor * 100;
const fromPercentageToFactor = (percentage: number) => percentage / 100;

const toDefaultFormValues = (fund?: Fund): Partial<FundCreateOrUpdate> => ({
  id: fund?.id,
  name: fund?.name,
  quantity: fund?.quantity,
  price: fund?.price,
  weight: fund?.weight?.target && fromFactorToPercentage(fund.weight.target),
});

type Props = {
  fund?: Fund;
  onCancel: () => void;
  onSubmit: (fund: FundCreateOrUpdate) => void;
};

const FundCreateOrUpdateForm = ({ fund, onCancel, onSubmit }: Props) => {
  const handleSubmit = useCallback(
    (fund: FundCreateOrUpdate) => onSubmit({ ...fund, weight: fromPercentageToFactor(fund.weight) }),
    [onSubmit],
  );

  return (
    <FundForm<FundCreateOrUpdate>
      defaultValues={toDefaultFormValues(fund)}
      labels={{ submit: `${fund ? "Update" : "Add"} fund` }}
      onCancel={onCancel}
      onSubmit={handleSubmit}
    >
      {({ register, formState: { errors } }) => (
        <>
          <Input error={errors?.name?.message} {...inputs.name(register)}>
            Name
          </Input>
          <Input error={errors?.quantity?.message} {...inputs.quantity(register)}>
            Quantity
          </Input>
          <Input error={errors?.price?.message} {...inputs.price(register)}>
            Price
          </Input>
          <Input error={errors?.weight?.message} {...inputs.weight(register)}>
            Target weight
          </Input>
        </>
      )}
    </FundForm>
  );
};

export default FundCreateOrUpdateForm;