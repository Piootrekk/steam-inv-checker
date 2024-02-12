import axios from "axios";
import FinalAssets from "../interfaces/FinalAssets";
import React, { Dispatch } from "react";

// https://steamcommunity.com/inventory/${steamId}/252490/2?l=english&count=5000
// http://steamcommunity.com/market/priceoverview/?appid=730&currency=6&market_hash_name=HASHNAME
// 76561198090272581 76561198141466635
// https://community.cloudflare.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Za7WLEfCk4nReh8DEiv5dbMag6r7MzSPm-PITFYik
// backup url: `https://cors-anywhere.herokuapp.com` https://thingproxy.freeboard.io/fetch/
// https://express-proxy-jnve.onrender.com/

const fetchData = async (url: string) => {
  try {
    const response = await axios({
      method: "GET",
      url: url,
    });
    return response.data;
  } catch (error) {
    console.error(`:C ${error}`);
  }
};

export const fetchInventory = async (
  inputValue: string,
  autoComValue: string
) => {
  const version = autoComValue === "322330" ? "1" : "2";
  const url = `https://thingproxy.freeboard.io/fetch/https://steamcommunity.com/inventory/${inputValue}/${autoComValue}/${version}?l=english&count=5000`;
  return await fetchData(url);
};

export const fetchPrice = async (
  market_hash_name: string,
  autoComValue: string
) => {
  const url = `https://express-proxy-jnve.onrender.com/get/https://steamcommunity.com/market/priceoverview/?appid=${autoComValue}&currency=6&market_hash_name=${market_hash_name}`;
  return await fetchData(url);
};

export const fetchBulkPrice = async (
  assets: FinalAssets[],
  autoComValue: string,
  setUpdatedAssets: Dispatch<React.SetStateAction<any>>,
  method: any,
  delay: number
) => {
  setUpdatedAssets([]);
  let volume: string = "";
  let price: string = "";
  let median_price: string = "";
  for (const asset of assets) {
    try {
      const response = await method(asset.market_hash_name, autoComValue);
      volume = response.volume;
      price = response.lowest_price;
      median_price = response.median_price;
    } catch (error) {
      volume = "ERROR";
      price = "ERROR";
      median_price = "ERROR";
    }
    const updatedAssetsData = {
      ...asset,
      volume,
      price,
      median_price,
    };
    setUpdatedAssets((prev: FinalAssets[]) => [
      ...prev.filter((prevAsset) => prevAsset.key !== asset.key),
      updatedAssetsData,
    ]);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
};
