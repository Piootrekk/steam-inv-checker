import React from "react";
import FinalAssets from "./interfaces/FinalAssets";
import Card from "@mui/material/Card";

interface DataDisplayProps {
  assets: FinalAssets[];
}

const DataDisplay: React.FC<DataDisplayProps> = ({ assets }) => {
  return (
    <>
      {assets.map((asset: FinalAssets) => (
        <Card
          key={asset.key}
          sx={{
            margin: "0.5rem",
            padding: "0.5rem",
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",

            "& p": {
              margin: "1rem",
              fontSize: "1.2rem",
            },

            "& img": {
              width: "5rem",
              height: "5rem",
              marginRight: "1em",
            },
          }}
        >
          <img
            src={`https://community.cloudflare.steamstatic.com/economy/image/${asset.icon_url}`}
            alt="item"
          />
          <p>Name: {asset.market_hash_name}</p>
          <p>Amount: {asset.amount}</p>
        </Card>
      ))}
    </>
  );
};

export default DataDisplay;
