// DataProvider.tsx
import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

interface DataProviderProps {
  inputValue: string;
}

// const fetchData = async (steamId: string) => {
//   const response = await axios.get(
//     `https://steamcommunity.com/inventory/${steamId}/252490/2?l=english&count=5000`

//   );
//   return response.data;
// };

const fetchData = async (inputValue: string) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/todos/${inputValue}`
  );
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
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default DataProvider;
