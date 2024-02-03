// DataProvider.tsx
import React from "react";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import FinalAssets from "./interfaces/FinalAssets";
import DataDisplay from "./DataDisplay";

interface DataProviderProps {
  inputValue: string;
  autoComValue: string;
}

interface Item {
  market_hash_name: string;
  icon_url: string;
  classid: string;
}

interface Assets {
  classid: string;
  amount: string;
}

// https://steamcommunity.com/inventory/${steamId}/252490/2?l=english&count=5000
// http://steamcommunity.com/market/priceoverview/?appid=730&currency=6&market_hash_name=HASHNAME
// 76561198090272581 76561198141466635
// https://community.cloudflare.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Za7WLEfCk4nReh8DEiv5dbMag6r7MzSPm-PITFYik
// backup url: `https://cors-anywhere.herokuapp.com/https://steamcommunity.com/inventory/${inputValue}/252490/2?l=english&count=5000`,

const fetchPrice = async (market_hash_name: string, autoComValue: string) => {
  try {
    const response = await axios({
      method: "GET",
      url: `https://express-proxy-jnve.onrender.com/get/https://steamcommunity.com/market/priceoverview/?appid=${autoComValue}&currency=6&market_hash_name=${market_hash_name}`,
    });
    if (response.data.success === false) {
      return {
        volume: "0",
        lowest_price: "0",
      };
    }
    return response.data;
  } catch (error) {
    return {
      volume: "0",
      lowest_price: "0",
    };
  }
};

const fetchData = async (inputValue: string, autoComValue: string) => {
  const version = autoComValue === "322330" ? "1" : "2";
  const response = await axios({
    method: "GET",

    url: `https://thingproxy.freeboard.io/fetch/https://steamcommunity.com/inventory/${inputValue}/${autoComValue}/${version}?l=english&count=5000`,
  });
  return response.data;
};

const DataProvider: React.FC<DataProviderProps> = ({
  inputValue,
  autoComValue,
}) => {
  const [updatedAssets, setUpdatedAssets] = useState<FinalAssets[]>([]);

  const { data, isLoading, isError } = useQuery(
    ["steamInventory", inputValue],
    () => fetchData(inputValue, autoComValue),
    {
      retry: false,
    }
  );

  const itemsDescriptions = data?.descriptions.map((item: Item) => ({
    classid: item.classid,
    market_hash_name: item.market_hash_name,
    icon_url: item.icon_url,
  }));

  const uniqueclassidMap = new Map<string, number>();

  data?.assets.forEach((item: Assets) => {
    const { classid, amount } = item;
    const parsedAmount = parseInt(amount, 10);
    if (uniqueclassidMap.has(classid)) {
      const currentAmount = uniqueclassidMap.get(classid) || 0;
      uniqueclassidMap.set(classid, currentAmount + parsedAmount);
    } else {
      uniqueclassidMap.set(classid, parsedAmount);
    }
  });

  const assets: FinalAssets[] = Array.from(uniqueclassidMap).map(
    ([classid, amount], index) => {
      const correspondingItem = itemsDescriptions.find(
        (item: Item) => item.classid === classid
      );
      const market_hash_name = correspondingItem?.market_hash_name || "Unknown";
      const icon_url = correspondingItem?.icon_url || "";

      return {
        key: index,
        market_hash_name: market_hash_name,
        icon_url: icon_url,
        amount: amount,
        volume: "",
        price: "",
      };
    }
  );

  const updatePrices = async () => {
    const updatedAssetsData: FinalAssets[] = [];
    for (const asset of assets) {
      const response = await fetchPrice(asset.market_hash_name, autoComValue);
      console.log(response);
      const volume: string = response.volume;
      console.log(volume);
      const price: string = response.lowest_price;
      console.log(price);
      if (price !== "0" || volume !== "0") {
        updatedAssetsData.push({
          ...asset,
          volume,
          price,
        });
      } else {
        console.log("no price or volume");
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    setUpdatedAssets(updatedAssetsData);
  };

  useEffect(() => {
    if (!isLoading && data) {
      updatePrices();
    }
  }, [isLoading, data]);

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <h1>Data from Steam API</h1>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error fetching data </div>}
      {data && <DataDisplay assets={assets} />}
      {updatedAssets && <DataDisplay assets={updatedAssets} />}
    </div>
  );
};

export default DataProvider;
