import {
  DataGrid,
  GridColDef,
  GridValueFormatterParams,
  GridValueGetterParams,
  GridToolbar,
  GridFooterContainer,
} from "@mui/x-data-grid";
import { FinalAssetsDisplay } from "./interfaces/FinalAssets";
import React from "react";
import { DataGridStyle } from "./styles/PriceTableStyles";
import { TablePagination } from "@mui/material";

const customSortComparator = (v1: any, v2: any) => {
  if (Number.isNaN(v1) && !Number.isNaN(v2)) {
    return 1;
  } else if (Number.isNaN(v2) && !Number.isNaN(v1)) {
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
    width: 5,
    valueGetter: (params: GridValueGetterParams) => {
      return params.row.key;
    },
  },
  {
    field: "market_hash_name",
    headerName: "Name",
    flex: 1,
    minWidth: 200,
    hideable: false,
  },
  { field: "price", headerName: "Market Price [PLN]", flex: 1 },
  { field: "volume", headerName: "Volume", flex: 1, hideable: true },
  {
    field: "median_price",
    headerName: "Median Market [PLN]",
    flex: 1,
  },
  { field: "amount", headerName: "Amount", flex: 1, editable: true },
  {
    field: "boughtPrice",
    headerName: "Price bought",
    flex: 1,
    editable: true,
    valueFormatter: (params: GridValueFormatterParams) =>
      checkIfNaN(params.value),
    sortComparator: (v1, v2) => customSortComparator(v1, v2),
  },
  {
    field: "profitSingle",
    headerName: "Profit single [PLN]",
    flex: 1,
    valueFormatter: (params: GridValueFormatterParams) =>
      checkIfNaN(params.value),
    sortComparator: (v1, v2) => customSortComparator(v1, v2),
    cellClassName: (packageParams: any) => addStylesToCall(packageParams.value),
  },
  {
    field: "profit",
    headerName: "Profit [PLN]",
    flex: 1,
    valueFormatter: (params: GridValueFormatterParams) =>
      checkIfNaN(params.value),
    sortComparator: (v1, v2) => customSortComparator(v1, v2),
    cellClassName: (packageParams: any) => addStylesToCall(packageParams.value),
  },

  {
    field: "profitPercent",
    headerName: "Profit %",
    flex: 1,
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
  const totalAmount = assets.reduce((total, asset) => total + asset.amount, 0);
  const totalProfit = assets
    .reduce((total, asset) => total + (asset.profit ? asset.profit : 0), 0)
    .toFixed(2) as unknown as number;

  const averageProfit = (totalProfit / totalAmount).toFixed(2);
  return (
    <>
      <DataGrid
        sx={DataGridStyle}
        rows={assets}
        columns={columns}
        pagination={true}
        initialState={{
          columns: {
            columnVisibilityModel: {
              id: false,
              volume: false,
              median_price: false,
              boughtPrice: false,
              profitSingle: false,
            },
          },
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
          footer: () => (
            <>
              <GridFooterContainer>
                <p>Total amount: {totalAmount}</p>
                <p>Total profit: {totalProfit}</p>
                <p> Average profit: {averageProfit}%</p>
                <TablePagination
                  rowsPerPageOptions={[20]}
                  component="div"
                  count={assets.length}
                  rowsPerPage={20}
                  page={0}
                  onPageChange={() => {}}
                  onRowsPerPageChange={() => {}}
                />
              </GridFooterContainer>
            </>
          ),
        }}
      />
    </>
  );
};

export default PriceTable;
