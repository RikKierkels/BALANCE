import styled from "styled-components";
import Form from "../Form/Form";
import Input from "../Form/Input";
import { Fund, FundCreateOrUpdate } from "../../shared/portfolio";
import PrimaryButton from "../Buttons/PrimaryButton";

const fromFactorToPercentage = (factor: number) => factor * 100;
const fromPercentageToFactor = (percentage: number) => percentage / 100;

const toDefaultFormValues = (fund?: Fund): Partial<FundCreateOrUpdate> => ({
  id: fund?.id,
  name: fund?.name,
  quantity: fund?.quantity,
  price: fund?.price,
  weight: fund?.weight?.target && fromFactorToPercentage(fund?.weight?.target),
});

type Props = {
  fund?: Fund;
  onSubmit: (fund: FundCreateOrUpdate) => void;
};

const FundCreateOrUpdateForm = ({ fund, onSubmit }: Props) => {
  const handleSubmit = (fund: FundCreateOrUpdate) => onSubmit({ ...fund, weight: fromPercentageToFactor(fund.weight) });

  return (
    <StyledForm<FundCreateOrUpdate> onSubmit={handleSubmit} defaultValues={toDefaultFormValues(fund)}>
      {({ register, formState: { errors } }) => (
        <>
          <Input label="Name" {...register("name", { required: true })} />
          <Input
            label="Quantity"
            type="number"
            {...register("quantity", { required: true, min: 0, valueAsNumber: true })}
          />
          <Input
            label="Price"
            type="number"
            step="0.001"
            {...register("price", { required: true, min: 0, valueAsNumber: true })}
          />
          <Input
            label="Target weight"
            type="number"
            {...register("weight", { required: true, min: 0, max: 100, valueAsNumber: true })}
          />
          <PrimaryButton type="submit">Save</PrimaryButton>
        </>
      )}
    </StyledForm>
  );
};

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;

  > *:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
` as typeof Form;

export default FundCreateOrUpdateForm;