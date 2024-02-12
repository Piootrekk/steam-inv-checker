import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import FinalAssets from "./interfaces/FinalAssets";

interface PriceProviderProps {
  assets: FinalAssets[];
  autoComValue: string;
}
// https://steamcommunity.com/inventory/${steamId}/252490/2?l=english&count=5000
// http://steamcommunity.com/market/priceoverview/?appid=730&currency=6&market_hash_name=HASHNAME
// 76561198090272581 76561198141466635
// https://community.cloudflare.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Za7WLEfCk4nReh8DEiv5dbMag6r7MzSPm-PITFYik
// backup url: `https://cors-anywhere.herokuapp.com/https://steamcommunity.com/inventory/${inputValue}/252490/2?l=english&count=5000`,
// https://express-proxy-jnve.onrender.com/
const fetchPrice = async (market_hash_name: string, autoComValue: string) => {
  try {
    const response = await axios({
      method: "GET",
      url: `https://express-proxy-jnve.onrender.com/get/https://steamcommunity.com/market/priceoverview/?appid=${autoComValue}&currency=6&market_hash_name=${market_hash_name}`,
    });
    console.log("Waiting");
    if (response.data.success === false) {
      console.log("no price or volume");
      return {
        volume: "0",
        lowest_price: "0",
      };
    }
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(":C");
    return {
      volume: "0",
      lowest_price: "0",
    };
  }
};

const PriceProvider: React.FC<PriceProviderProps> = ({
  assets,
  autoComValue,
}) => {
  const [updatedAssets, setUpdatedAssets] = useState<FinalAssets[]>([]);

  const updatePrices = async () => {
    const updatedAssetsData: FinalAssets[] = [];
    for (const asset of assets) {
      const response = await fetchPrice(asset.market_hash_name, autoComValue);
      const volume: string = response.volume;
      const price: string = response.lowest_price;
      if (price !== "0" || volume !== "0") {
        updatedAssetsData.push({
          ...asset,
          volume,
          price,
        });
      } else {
        console.log("no price or volume");
      }

      await new Promise((resolve) => setTimeout(resolve, 4000));
    }

    setUpdatedAssets(updatedAssetsData);
  };

  useEffect(() => {
    console.log("Mounting PriceProvider");
    updatePrices();
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
