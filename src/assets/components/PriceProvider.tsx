import React, { Dispatch } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import FinalAssets from "./interfaces/FinalAssets";
import { fetchPrice } from "./utils/fetchData";
import { parseToNumber, volumeAdjust } from "./utils/priceAdjust";
import { checkPropOfObject } from "./utils/notCategorizedMethods";
import Container from "@mui/material/Container";

interface PriceProviderProps {
  assets: FinalAssets[];
  autoComValue: string;
}

interface FinalAssetsDisplay extends FinalAssets {
  afteFee: number | null;
  boughtPrice: number | null;
  profit: number | null;
  profitPercent: number | null;
}

type priceVolumeType = string | number;

export const fetchBulkPrice = async (
  assets: FinalAssets[],
  autoComValue: string,
  setUpdatedAssets: Dispatch<React.SetStateAction<any>>,
  method: any,
  delay: number
) => {
  setUpdatedAssets([]);
  let volume: priceVolumeType = "";
  let price: priceVolumeType = "";
  let median_price: priceVolumeType = "";
  for (const asset of assets) {
    try {
      const response = await method(asset.market_hash_name, autoComValue);
      volume = checkPropOfObject(
        response,
        "volume",
        volumeAdjust(response.volume)
      );
      price = checkPropOfObject(
        response,
        "lowest_price",
        parseToNumber(response.lowest_price)
      );
      median_price = checkPropOfObject(
        response,
        "median_price",
        parseToNumber(response.median_price)
      );
    } catch (error) {
      volume = "Error";
      price = "Error";
      median_price = "Error";
    }
    const updatedAssetsData = {
      ...asset,
      volume,
      price,
      median_price,
      id: asset.key,
    };
    setUpdatedAssets((prev: FinalAssetsDisplay[]) => [
      ...prev.filter((prevAsset) => prevAsset.key !== asset.key),
      updatedAssetsData,
    ]);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
};

const PriceProvider: React.FC<PriceProviderProps> = ({
  assets,
  autoComValue,
}) => {
  const [updatedAssets, setUpdatedAssets] = useState<FinalAssetsDisplay[]>([]);

  useEffect(() => {
    console.log("Mounting PriceProvider");
    fetchBulkPrice(assets, autoComValue, setUpdatedAssets, fetchPrice, 2000);
  }, [assets]);

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

  return (
    <Container>
      <DataGrid
        sx={{ height: 800, width: "100%" }}
        rows={updatedAssets}
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
    </Container>
  );
};

export default PriceProvider;
