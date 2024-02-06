import React from "react";
import FinalAssets from "./interfaces/FinalAssets";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Styles } from "./DataDisplayStyles";
import { useState } from "react";
import { Button } from "@mui/material";

interface DataDisplayProps {
  assets: FinalAssets[];
}

const DataDisplay: React.FC<DataDisplayProps> = ({ assets }) => {
  const [selectedToCheckPrice, setSelectedToCheckPrice] = useState<
    FinalAssets[]
  >([]);

  const handleCardClick = (selectedAsset: FinalAssets) => {
    const isAssetSelected = selectedToCheckPrice.some(
      (asset: FinalAssets) => asset.key === selectedAsset.key
    );
    if (isAssetSelected) {
      const updatedSelectedAssets = selectedToCheckPrice.filter(
        (asset: FinalAssets) => asset.key !== selectedAsset.key
      );
      setSelectedToCheckPrice(updatedSelectedAssets);
    } else {
      setSelectedToCheckPrice((prevSelectedAssets: FinalAssets[]) => [
        ...prevSelectedAssets,
        selectedAsset,
      ]);
    }
  };

  return (
    <Box sx={Styles}>
      <Button
        variant="contained"
        sx={{
          visibility: selectedToCheckPrice.length > 0 ? "visible" : "hidden",
        }}
      >
        Load Price Selected Items: {selectedToCheckPrice.length}
      </Button>

      <Grid container spacing={2}>
        {assets.map((asset: FinalAssets) => (
          <Grid item key={asset.key}>
            <Card
              sx={{
                backgroundColor: `#${asset.name_color}`,
                "&:hover": {
                  cursor: asset.marketable === 1 ? "pointer" : "not-allowed",
                },

                "&::before": {
                  border: selectedToCheckPrice.some(
                    (selectedAsset) => selectedAsset.key === asset.key
                  )
                    ? "3px solid blue"
                    : "none",
                },
              }}
              onClick={() => handleCardClick(asset)}
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
