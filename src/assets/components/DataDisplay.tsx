import React from "react";
import FinalAssets from "./interfaces/FinalAssets";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Styles, BoxStyles, ButtonStyles } from "./DataDisplayStyles";
import { useState } from "react";
import { Button } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

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
        sx={ButtonStyles(selectedToCheckPrice.length)}
      >
        Load Price Selected Items: {selectedToCheckPrice.length}
      </Button>

      <Grid container spacing={2}>
        {assets.map((asset: FinalAssets) => (
          <Grid item key={asset.key}>
            <Card
              sx={BoxStyles(
                asset.name_color,
                asset.marketable,
                selectedToCheckPrice.some(
                  (selectedAsset) => selectedAsset.key === asset.key
                )
              )}
              onClick={() => handleCardClick(asset)}
            >
              <div className="imgDiv">
                <LazyLoadImage
                  effect="blur"
                  src={`https://community.cloudflare.steamstatic.com/economy/image/${asset.icon_url}`}
                  alt="item"
                  width="100%"
                  height="100%"
                  placeholder={<div>loading...</div>}
                />
              </div>
              <Typography>{asset.amount}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default DataDisplay;
