import React, { Dispatch } from "react";
import { useState, useEffect } from "react";
import { FinalAssets, FinalAssetsDisplay } from "./interfaces/FinalAssets";
import { fetchPrice } from "./utils/fetchData";
import { parseToNumber, volumeAdjust } from "./utils/priceAdjust";
import { checkPropOfObject } from "./utils/notCategorized";
import Container from "@mui/material/Container";
import PriceTable from "./PriceTable";

interface PriceProviderProps {
  assets: FinalAssets[];
  autoComValue: string;
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
    const response = await method(asset.market_hash_name, autoComValue);
    volume = volumeAdjust(
      checkPropOfObject(response, "volume", response.volume)
    ) as priceVolumeType;
    price = parseToNumber(
      checkPropOfObject(response, "lowest_price", response.lowest_price)
    ) as priceVolumeType;
    median_price = parseToNumber(
      checkPropOfObject(response, "median_price", response.median_price)
    ) as priceVolumeType;

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

  return (
    <Container>
      <PriceTable assets={updatedAssets} />
    </Container>
  );
};

export default PriceProvider;
