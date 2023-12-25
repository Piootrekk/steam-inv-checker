// DataProvider.tsx
import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

interface DataProviderProps {
  inputValue: string;
}
// https://steamcommunity.com/inventory/${steamId}/252490/2?l=english&count=5000
// http://steamcommunity.com/market/priceoverview/?appid=730&currency=6&market_hash_name=HASHNAME
// 76561198090272581 76561198141466635

const fetchData = async (inputValue: string) => {
  const response = await axios({
    method: "GET",
    url: `https://cors-anywhere.herokuapp.com/https://steamcommunity.com/inventory/${inputValue}/252490/2?l=english&count=5000`,
    // headers: {
    //   Origin: `https://steamcommunity.com/inventory/${inputValue}/252490/2?l=english&count=5000`,
    // },
  });
  return response.data;
};

const DataProvider: React.FC<DataProviderProps> = ({ inputValue }) => {
  const { data, isLoading, isError } = useQuery(
    ["steamInventory", inputValue],
    () => fetchData(inputValue),
    {
      retry: false,
    }
  );

  return (
    <div>
      <h1>Data from Steam API</h1>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error fetching data</div>}
      {data && <pre>{JSON.stringify(data.descriptions, null, 2)}</pre>}
    </div>
  );
};

export default DataProvider;
