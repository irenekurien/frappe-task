import { useState } from "react";
import { useFrappeCreateDoc } from "frappe-react-sdk";
import { Button, Popup } from "../../components";
import { CreatePledgeForm } from "..";

type NewPledgePopupType = {
  id: string;
  isOpen: boolean;
  handleClose: () => void;
};

const NewPledgePopup = ({ id, isOpen, handleClose }: NewPledgePopupType) => {
  const [pledge, setPledge] = useState({
    loan_id: id,
    price: 0,
    number_of_share: 0,
    stock_id: "",
  });
  const { createDoc, error } = useFrappeCreateDoc();

  const handlePledgeFormSubmit = async () => {
    createDoc("Pledges", pledge);

    if (!error) {
      handleClose();
    }
  };

  const content = <CreatePledgeForm pledge={pledge} onChange={setPledge} />;
  const buttons = (
    <>
      <Button onClick={handlePledgeFormSubmit}>Submit</Button>
      <Button varient="outlined" onClick={handleClose}>
        Cancel
      </Button>
    </>
  );

  return (
    <Popup
      title="Create New Pledge"
      content={content}
      buttons={buttons}
      isOpen={isOpen}
      handleClose={handleClose}
    />
  );
};

export default NewPledgePopup;
