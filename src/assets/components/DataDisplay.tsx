import React from "react";
import FinalAssets from "./interfaces/FinalAssets";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Styles } from "./DataDisplayStyles";

interface DataDisplayProps {
  assets: FinalAssets[];
}

const DataDisplay: React.FC<DataDisplayProps> = ({ assets }) => {
  return (
    <Box sx={Styles}>
      <Grid container spacing={2}>
        {assets.map((asset: FinalAssets) => (
          <Grid item key={asset.key}>
            <Card
              sx={{
                backgroundColor: `#${asset.name_color}`,
              }}
            >
              <img
                src={`https://community.cloudflare.steamstatic.com/economy/image/${asset.icon_url}`}
                alt="item"
              />
              <Typography>{asset.amount}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default DataDisplay;
