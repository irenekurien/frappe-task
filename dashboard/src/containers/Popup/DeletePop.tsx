import { useFrappeDeleteDoc } from "frappe-react-sdk";
import { Button, Popup } from "../../components";

type DeletePopupType = {
  text: string;
  isOpen: boolean;
  handleClose: () => void;
  rowData: any;
};

const DeletePopup = ({
  text,
  isOpen,
  handleClose,
  rowData,
}: DeletePopupType) => {

  const { deleteDoc, error } = useFrappeDeleteDoc();
  const handleFormSubmit = async () => {
    deleteDoc(text, rowData.rowId);

    if (!error) {
      handleClose();
    }
  };

  const content =  <p>Are you sure you want to delete this {text}</p>;
  const buttons = (
    <>
      <Button onClick={handleFormSubmit}>Delete</Button>
      <Button varient="outlined" onClick={handleClose}>
        Cancel
      </Button>
    </>
  );
  return (
    <Popup
      title= {`Delete ${text}`}
      content={content}
      buttons={buttons}
      isOpen={isOpen}
      handleClose={handleClose}
    />
  );
};

export default DeletePopup;
