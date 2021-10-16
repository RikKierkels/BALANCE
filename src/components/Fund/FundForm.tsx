import styled from "styled-components";
import Form from "../Form/Form";
import Input from "../Form/Input";
import { Fund } from "../../shared/portfolio";
import PrimaryButton from "../Buttons/PrimaryButton";

export type PartialFund = Pick<Fund, "name" | "quantity" | "price"> & {
  weight: Fund["weight"]["target"];
};

const toFormValues = ({ name, quantity, price, weight }: Fund): PartialFund => ({
  name: name,
  quantity,
  price,
  weight: weight.target,
});

type Props = {
  fund?: Fund;
  onSubmit: (fund: PartialFund) => void;
};

const FundForm = ({ fund, onSubmit }: Props) => (
  <StyledForm<PartialFund> onSubmit={onSubmit} defaultValues={fund ? toFormValues(fund) : {}}>
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

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;

  > *:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
` as typeof Form;

export default FundForm;