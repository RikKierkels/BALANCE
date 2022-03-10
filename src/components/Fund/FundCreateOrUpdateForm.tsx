import React from "react";
import styled from "styled-components";
import { Fund, FundCreateOrUpdate } from "../../shared/portfolio";
import PrimaryButton from "../Buttons/PrimaryButton";
import Input from "../Form/Input";
import { inputs } from "../Form/input-props";
import Form from "../Form/Form";

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
  onSubmit: (fund: FundCreateOrUpdate) => void;
};

const FundCreateOrUpdateForm = ({ fund, onSubmit }: Props) => {
  const handleSubmit = (fund: FundCreateOrUpdate) => onSubmit({ ...fund, weight: fromPercentageToFactor(fund.weight) });

  return (
    <StyledForm<FundCreateOrUpdate> defaultValues={toDefaultFormValues(fund)} onSubmit={handleSubmit}>
      {({ register, formState: { errors } }) => (
        <>
          <Input label="Name" error={errors?.name?.message} {...inputs.name(register)} />
          <Input label="Quantity" error={errors?.quantity?.message} {...inputs.quantity(register)} />
          <Input label="Price" error={errors?.price?.message} {...inputs.price(register)} />
          <Input label="Target weight" error={errors?.weight?.message} {...inputs.weight(register)} />
          <PrimaryButton type="submit">Save</PrimaryButton>
        </>
      )}
    </StyledForm>
  );
};

const StyledForm = styled(Form)`
  > * + * {
    margin-top: ${({ theme }) => theme.spacing.md};
  }
` as typeof Form;

export default FundCreateOrUpdateForm;