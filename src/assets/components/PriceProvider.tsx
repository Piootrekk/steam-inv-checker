import React from "react";

import { useState, useEffect } from "react";
import FinalAssets from "./interfaces/FinalAssets";
import { fetchPrice, fetchBulkPrice } from "./utils/fetchData";

interface PriceProviderProps {
  assets: FinalAssets[];
  autoComValue: string;
}

const PriceProvider: React.FC<PriceProviderProps> = ({
  assets,
  autoComValue,
}) => {
  const [updatedAssets, setUpdatedAssets] = useState<FinalAssets[]>([]);

  useEffect(() => {
    console.log("Mounting PriceProvider");
    fetchBulkPrice(assets, autoComValue, setUpdatedAssets, fetchPrice, 2000);
  }, [assets]);

  return (
    <>
      <p> RETURN:</p>
      {updatedAssets.map((asset) => (
        <div key={asset.key}>
          <p>
            {asset.market_hash_name}, {asset.price}, {asset.volume}
          </p>
        </div>
      ))}
    </>
  );
};

export default PriceProvider;
