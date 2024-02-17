import {
  DataGrid,
  GridColDef,
  GridValueFormatterParams,
  GridValueGetterParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { FinalAssetsDisplay } from "./interfaces/FinalAssets";
import React from "react";
import { DataGridStyle } from "./styles/PriceTableStyles";

const customSortComparator = (v1: any, v2: any) => {
  if (v1 === "ERROR" && v2 !== "ERROR") {
    return 1;
  } else if (v1 !== "ERROR" && v2 === "ERROR") {
    return -1;
  } else {
    return parseFloat(v1) - parseFloat(v2);
  }
};

const checkIfNaN = (value: any) => {
  if (Number.isNaN(value)) {
    return "ERROR";
  }
  return value;
};

const addStylesToCall = (value: any) => {
  if (value > 0) {
    return "green-positive";
  } else if (value < 0) {
    return "red-negative";
  }
  return "";
};

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Id",
    width: 30,
    valueGetter: (params: GridValueGetterParams) => {
      return params.row.key;
    },
  },
  {
    field: "market_hash_name",
    headerName: "Name",
    width: 300,
    hideable: false,
  },
  { field: "price", headerName: "Market Price [PLN]", width: 125 },
  { field: "volume", headerName: "Volume", width: 125, hideable: true },
  {
    field: "median_price",
    headerName: "Median Market [PLN]",
    width: 125,
    hideable: true,
  },
  { field: "amount", headerName: "Amount", width: 125, editable: true },
  {
    field: "boughtPrice",
    headerName: "Price bought",
    width: 125,
    editable: true,
    hideable: true,
    valueFormatter: (params: GridValueFormatterParams) =>
      checkIfNaN(params.value),
    sortComparator: (v1, v2) => customSortComparator(v1, v2),
  },
  {
    field: "profitSingle",
    headerName: "Profit single [PLN]",
    width: 125,
    hideable: true,

    valueFormatter: (params: GridValueFormatterParams) =>
      checkIfNaN(params.value),
    sortComparator: (v1, v2) => customSortComparator(v1, v2),
    cellClassName: (packageParams: any) => addStylesToCall(packageParams.value),
  },
  {
    field: "profit",
    headerName: "Profit [PLN]",
    width: 125,
    valueFormatter: (params: GridValueFormatterParams) =>
      checkIfNaN(params.value),
    sortComparator: (v1, v2) => customSortComparator(v1, v2),
    cellClassName: (packageParams: any) => addStylesToCall(packageParams.value),
  },

  {
    field: "profitPercent",
    headerName: "Profit %",
    width: 125,
    sortComparator: (v1, v2) => customSortComparator(v1, v2),
    cellClassName: (packageParams: any) => addStylesToCall(packageParams.value),
    valueFormatter: (params: GridValueFormatterParams) => {
      if (Number.isNaN(params.value)) {
        return "ERROR";
      }
      return `${params.value} %`;
    },
  },
];

interface PriceTablesProps {
  assets: FinalAssetsDisplay[];
}

const PriceTable: React.FC<PriceTablesProps> = ({ assets }) => {
  return (
    <>
      <DataGrid
        sx={DataGridStyle}
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
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </>
  );
};

export default PriceTable;
