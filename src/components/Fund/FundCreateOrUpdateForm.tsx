import React, { useCallback } from "react";
import styled from "styled-components";
import { Fund, FundCreateOrUpdate } from "../../shared/portfolio";
import PrimaryButton from "../Buttons/PrimaryButton";
import Input from "../Form/Input";
import { inputs } from "../Form/input-props";
import Form from "../Form/Form";
import SecondaryButton from "../Buttons/SecondaryButton";

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
    <StyledForm<FundCreateOrUpdate> defaultValues={toDefaultFormValues(fund)} onSubmit={handleSubmit}>
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
          <Actions>
            <SecondaryButton type="button" onClick={onCancel}>
              Cancel
            </SecondaryButton>
            <PrimaryButton type="submit">{fund ? "Update fund" : "Add fund"}</PrimaryButton>
          </Actions>
        </>
      )}
    </StyledForm>
  );
};

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

export default FundCreateOrUpdateForm;