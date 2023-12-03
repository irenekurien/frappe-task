import React from "react";
import { Input } from "../../components";

type Loan = {
  amount: string;
  term: string;
};

type FormProps = {
  loan: Loan;
  onChange: (updatedLoan: Loan) => void;
};

const CreateLoanForm = ({ loan, onChange }: FormProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...loan, [name]: value });
  };

  return (
    <>
      <Input
        label="Loan Amount"
        type="amount"
        value={loan.amount}
        onChange={handleInputChange}
      />
      <Input
        label="Term"
        type="term"
        value={loan.term}
        onChange={handleInputChange}
      />
    </>
  );
};

export default CreateLoanForm;
