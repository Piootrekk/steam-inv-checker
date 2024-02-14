import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { FinalAssetsDisplay } from "./interfaces/FinalAssets";
import React from "react";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Id",
    width: 30,
    valueGetter: (params: GridValueGetterParams) => {
      return params.row.key;
    },
  },
  { field: "market_hash_name", headerName: "Name", width: 300 },
  { field: "price", headerName: "Price [PLN]", width: 125 },
  { field: "volume", headerName: "Volume", width: 125 },
  { field: "median_price", headerName: "Median [PLN]", width: 125 },
  { field: "amount", headerName: "Amount", width: 125, editable: true },
];

interface PriceTablesProps {
  assets: FinalAssetsDisplay[];
}

const PriceTable: React.FC<PriceTablesProps> = ({ assets }) => {
  return (
    <>
      <DataGrid
        sx={{ height: 800, width: "100%" }}
        rows={assets}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        pageSizeOptions={[20]}
        checkboxSelection={true}
        disableRowSelectionOnClick
      />
    </>
  );
};

export default PriceTable;
