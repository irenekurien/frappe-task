import { useFrappeGetDocList, useFrappeAuth } from "frappe-react-sdk";
import { useParams } from "react-router-dom";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Container, Typography, Grid } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { usePopUp } from "../../hooks";
import { Button, Card } from "../../components";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { DataTable, DeletePopup, NewPledgePopup } from "../../containers";

type PledgeType = {
  name: string;
  stock_id: number;
  number_of_share: number;
  price: number;
};

export default function LoanInfo() {
  const { id } = useParams();

  const { popUp, handlePopUpOpen, handlePopUpClose } = usePopUp([
    "newPledgePopup",
    "deletePledgePopup",
  ]);

  const { currentUser } = useFrappeAuth();

  const { data: loan } = useFrappeGetDocList("Loan", {
    fields: [
      "name",
      "amount",
      "term",
      "status",
      "outstanding_interest",
      "penalty_charges",
      "repaid_principal",
      "ltv_ratio",
    ],
    filters: [
      ["name", "=", id || ""],
      ["owner", "=", currentUser || ""],
    ],
  });

  const { data: pledge }: { data?: PledgeType[] } = useFrappeGetDocList(
    "Pledges",
    {
      fields: ["name", "stock_id", "number_of_share", "price"],
      filters: [
        ["loan_id", "=", id || ""],
        ["owner", "=", currentUser || ""],
      ],
    }
  );

  const { data: stock } = useFrappeGetDocList("UserStock", {
    fields: ["name", "stock_name", "stock_price"],
    filters: [["name", "=", pledge ? pledge[0]?.stock_id : ""]],
  });

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "stockName", headerName: "Stock", flex: 4 },
    { field: "numberOfShare", headerName: "No Of Shares", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    {
      field: " ",
      headerName: " ",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <p onClick={() => openDeletePledgePopup(params.row.id, params.row)}>
          <DeleteOutlineIcon color="error" />
        </p>
      ),
    },
  ];

  const rowData =
    pledge?.map((pledgeItem) => {
      const stockData = stock?.find(
        (stockItem) => stockItem.name === pledgeItem.stock_id
      );

      return {
        id: pledgeItem.name,
        stockName: stockData?.stock_name || "",
        numberOfShare: pledgeItem.number_of_share || 0,
        price: pledgeItem.price || 0,
      };
    }) || [];

  const openNewPledgePopup = () => {
    handlePopUpOpen("newPledgePopup");
  };

  const closeNewPledgePopup = () => {
    handlePopUpClose("newPledgePopup");
  };

  const openDeletePledgePopup = (rowId: number, rowData: any) => {
    handlePopUpOpen("deletePledgePopup", { rowId, rowData });
  };

  const closeDeleteLoanPopup = () => {
    handlePopUpClose("deletePledgePopup");
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
            Loan Details
          </Typography>

          {rowData.length === 0 && (
            <Button onClick={openNewPledgePopup}>Add Pledge</Button>
          )}
        </Box>
        {loan && (
          <>
            <Grid container spacing={2}>
              <Grid item md={3} key={1}>
                <Card heading="Loan ID" content={loan[0]?.name} />
                <Card
                  heading="Outstanding Interest"
                  content={loan[0]?.outstanding_interest}
                />
              </Grid>
              <Grid item md={3} key={2}>
                <Card heading="Principal Amount" content={loan[0]?.amount} />
                <Card
                  heading="Penalty Charges"
                  content={loan[0]?.penalty_charges}
                />
              </Grid>
              <Grid item md={3} key={3}>
                <Card heading="Term" content={loan[0]?.term} />
                <Card
                  heading="Amount Paid"
                  content={loan[0]?.repaid_principal}
                />
              </Grid>
              <Grid item md={3} key={4}>
                <Card heading="Status" content={loan[0]?.status} />
                <Card
                  heading="LTV Ratio"
                  content={loan[0]?.ltv_ratio}
                />
              </Grid>
            </Grid>
            {stock && pledge && (
              <>
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "primary.main",
                    padding: "10px 25px",
                    margin: "25px",
                  }}
                >
                  Loan to Value Ratio
                </Typography>
                <PieChart
                  series={[
                    {
                      data: [
                        {
                          id: 0,
                          value: loan[0].amount,
                          label: "Pending Principal Amount",
                        },
                        {
                          id: 1,
                          value: loan[0].outstanding_interest,
                          label: "Outstanding Interest",
                        },
                        {
                          id: 2,
                          value: loan[0].penalty_charges,
                          label: "Penalty Charges",
                        },
                        {
                          id: 3,
                          value:
                            stock[0]?.stock_price *
                              pledge[0]?.number_of_share || 0,
                          label: "Market Value",
                        },
                      ],
                    },
                  ]}
                  width={1000}
                  height={200}
                />
              </>
            )}
          </>
        )}
        {rowData.length !== 0 && (
          <>
            <Typography
              variant="h5"
              sx={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "primary.main",
                padding: "10px 25px",
                margin: "25px",
              }}
            >
              Pledges
            </Typography>
            <DataTable rows={rowData} columns={columns} />{" "}
          </>
        )}
        <NewPledgePopup
          id={id || ""}
          isOpen={popUp.newPledgePopup.isOpen}
          handleClose={closeNewPledgePopup}
        />
        <DeletePopup
          text="Pledges"
          isOpen={popUp.deletePledgePopup.isOpen}
          handleClose={closeDeleteLoanPopup}
          rowData={popUp.deletePledgePopup.data}
        />
      </Box>
    </Container>
  );
}
