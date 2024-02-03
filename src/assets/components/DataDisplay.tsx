import React from "react";
import FinalAssets from "./interfaces/FinalAssets";
import Card from "@mui/material/Card";
import { CardStyle } from "./DataDisplayStyles";

interface DataDisplayProps {
  assets: FinalAssets[];
}

const DataDisplay: React.FC<DataDisplayProps> = ({ assets }) => {
  return (
    <>
      {assets.map((asset: FinalAssets) => (
        <Card key={asset.key} sx={CardStyle}>
          <img
            src={`https://community.cloudflare.steamstatic.com/economy/image/${asset.icon_url}`}
            alt="item"
          />
          <p>Name: {asset.market_hash_name}</p>
          <p>Amount: {asset.amount}</p>
          <p>Price: {asset.price}</p>
          <p>Volume: {asset.volume}</p>
        </Card>
      ))}
    </>
  );
};

export default DataDisplay;
