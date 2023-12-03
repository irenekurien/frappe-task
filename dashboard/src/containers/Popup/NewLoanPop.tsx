import { useState } from "react";
import { useFrappeCreateDoc } from "frappe-react-sdk";
import { CreateLoanForm } from "..";
import { Button, Popup } from "../../components";

type NewLoanPopupType = {
  isOpen: boolean;
  handleClose: () => void;
};

const NewLoanPopup = ({ isOpen, handleClose }: NewLoanPopupType) => {
  const [loan, setLoan] = useState({ amount: "", term: "" });
  const { createDoc, error } = useFrappeCreateDoc();

  const handleLoanFormSubmit = async () => {
    createDoc("Loan", loan);

    if (!error) {
      handleClose();
    }
  };

  const content = <CreateLoanForm loan={loan} onChange={setLoan} />;
  const buttons = (
    <>
      <Button onClick={handleLoanFormSubmit}>Submit</Button>
      <Button varient="outlined" onClick={handleClose}>
        Cancel
      </Button>
    </>
  );

  return (
    <Popup
      title="Create New Loan"
      content={content}
      buttons={buttons}
      isOpen={isOpen}
      handleClose={handleClose}
    />
  );
};

export default NewLoanPopup;
