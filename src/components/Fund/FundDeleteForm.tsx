import React from "react";
import FundForm from "./FundForm";

type Props = {
  onConfirm: () => void;
  onCancel: () => void;
};

const FundDeleteForm = ({ onConfirm, onCancel }: Props) => (
  <FundForm labels={{ submit: "Delete" }} onCancel={onCancel} onSubmit={onConfirm}>
    {() => <p>This will permanently remove the fund(s) and re-balance the portfolio. This action cannot be undone.</p>}
  </FundForm>
);

export default FundDeleteForm;