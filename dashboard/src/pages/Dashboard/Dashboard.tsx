import { useFrappeGetDocList, useFrappeAuth } from "frappe-react-sdk";
import { useNavigate } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { usePopUp } from "../../hooks";
import { Button } from "../../components";
import { DataTable, DeletePopup, NewLoanPopup } from "../../containers";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function Dashboard() {
  const navigate = useNavigate();

  const { popUp, handlePopUpOpen, handlePopUpClose } = usePopUp([
    "newLoanPopup",
    "deleteLoanPopup",
  ]);

  const { currentUser } = useFrappeAuth();

  const { data } = useFrappeGetDocList("Loan", {
    fields: ["name", "amount", "term", "status"],
    filters: [["owner", "=", currentUser || ""]],
  });

  const rows = data?.map((row) => ({
    id: row.name,
    ...row,
  }));

  const columns: GridColDef[] = [
    { field: "name", headerName: "ID", flex: 1 },
    { field: "amount", headerName: "Amount", flex: 1 },
    { field: "term", headerName: "Term", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "actions",
      headerName: "More",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <p onClick={() => navigate(`/loan/${params.row.name}`)}>View Details</p>
      ),
    },
    {
      field: " ",
      headerName: " ",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <p onClick={() => openDeleteLoanPopup(params.row.name, params.row)}>
          <DeleteOutlineIcon color="error" />
        </p>
      ),
    },
  ];

  const openNewLoanPopup = () => {
    handlePopUpOpen("newLoanPopup");
  };

  const closeNewLoanPopup = () => {
    handlePopUpClose("newLoanPopup");
  };

  const openDeleteLoanPopup = (rowId: number, rowData: any) => {
    handlePopUpOpen("deleteLoanPopup", { rowId, rowData });
  };

  const closeDeleteLoanPopup = () => {
    handlePopUpClose("deleteLoanPopup");
  };

  return (
    <Container component="main">
      <Box
        sx={{
          padding: "20px",
          color: "secondary.main",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "25px",
            margin: "25px",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "primary.main",
            }}
          >
            Dashboard
          </Typography>

          <Button onClick={openNewLoanPopup}>New Loan</Button>
        </Box>
        {rows && <DataTable rows={rows} columns={columns} />}
        <NewLoanPopup
          isOpen={popUp.newLoanPopup.isOpen}
          handleClose={closeNewLoanPopup}
        />
        <DeletePopup
          text="Loan"
          isOpen={popUp.deleteLoanPopup.isOpen}
          handleClose={closeDeleteLoanPopup}
          rowData={popUp.deleteLoanPopup.data}
        />
      </Box>
    </Container>
  );
}
