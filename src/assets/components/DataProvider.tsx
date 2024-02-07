// DataProvider.tsx
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import FinalAssets from "./interfaces/FinalAssets";
import DataDisplay from "./DataDisplay";
import {
  setDataToLocalStorage,
  clearOldestDataFromLocalStorage,
} from "./localStorage";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface DataProviderProps {
  inputValue: string;
  autoComValue: string;
}

interface Item {
  market_hash_name: string;
  icon_url: string;
  classid: string;
  marketable: boolean | number;
  name_color: string;
}

interface Assets {
  classid: string;
  amount: string;
}

const fetchData = async (inputValue: string, autoComValue: string) => {
  const version = autoComValue === "322330" ? "1" : "2";
  const response = await axios({
    method: "GET",

    url: `https://thingproxy.freeboard.io/fetch/https://steamcommunity.com/inventory/${inputValue}/${autoComValue}/${version}?l=english&count=5000`,
  });
  return response.data;
};

const combineAssets = (data: { assets?: Assets[] }): Map<string, number> => {
  const uniqueclassidMap = new Map<string, number>();

  data?.assets?.forEach((item: Assets) => {
    const { classid, amount } = item;
    const parsedAmount = parseInt(amount, 10);
    if (uniqueclassidMap.has(classid)) {
      const currentAmount = uniqueclassidMap.get(classid) || 0;
      uniqueclassidMap.set(classid, currentAmount + parsedAmount);
    } else {
      uniqueclassidMap.set(classid, parsedAmount);
    }
  });

  return uniqueclassidMap;
};

const processFinalAssets = (
  uniqueClassidMap: Map<string, number>,
  itemsDescriptions: Item[]
): FinalAssets[] => {
  return Array.from(uniqueClassidMap).map(([classid, amount], index) => {
    const correspondingItem = itemsDescriptions.find(
      (item: Item) => item.classid === classid
    );
    const market_hash_name = correspondingItem?.market_hash_name || "Unknown";
    const icon_url = correspondingItem?.icon_url || "";
    const name_color = correspondingItem?.name_color || "f5f5f5";
    const marketable = correspondingItem?.marketable || 0;

    return {
      key: index,
      market_hash_name: market_hash_name,
      icon_url: icon_url,
      amount: amount,
      name_color: name_color,
      marketable: marketable,
      volume: "",
      price: "",
    };
  });
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
      cacheTime: 0,
    }
  );

  useEffect(() => {
    if (data) {
      const currentDate = new Date();
      const dateString = `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;

      const dataToSave = {
        steamid: inputValue,
        appid: autoComValue,
        timeAdded: new Date(),
        data: data,
      };
      setDataToLocalStorage(`Items:${dateString}`, JSON.stringify(dataToSave));
      clearOldestDataFromLocalStorage("Items:", 3);
    }
  }, [data]);

  const itemsDescriptions = data?.descriptions.map((item: Item) => ({
    classid: item.classid,
    market_hash_name: item.market_hash_name,
    icon_url: item.icon_url,
    name_color: item.name_color,
    marketable: item.marketable,
  }));

  const uniqueClassidMap = combineAssets(data);

  const assets: FinalAssets[] = processFinalAssets(
    uniqueClassidMap,
    itemsDescriptions
  );

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <h1>Data from Steam API</h1>
      <p>SteamId: {inputValue}</p>
      <p>AppId: {autoComValue}</p>

      {isLoading && <CircularProgress />}
      {isError && (
        <div>
          <ErrorOutlineIcon style={{ color: "red", marginRight: "10px" }} />
          Error fetching data from Steam API
        </div>
      )}
      {data && <DataDisplay assets={assets} />}
    </div>
  );
};

export default DataProvider;
