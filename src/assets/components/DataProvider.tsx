// DataProvider.tsx
import React from "react";
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
      };
    }
  );

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
    </div>
  );
};

export default DataProvider;
