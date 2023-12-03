import { DataGrid, GridColDef } from "@mui/x-data-grid";

type DataTablePropsType = {
  rows: any;
  columns: GridColDef[];
};

const DataTable = ({ rows, columns }: DataTablePropsType) => {
  return (
    <div style={{ height: "100%", width: "80%", margin: "auto" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
};

export default DataTable;
