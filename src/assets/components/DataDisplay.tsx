import React, { useState, useCallback } from "react";
import FinalAssets from "./interfaces/FinalAssets";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Styles, BoxStyles, ButtonStyles } from "./styles/DataDisplayStyles";
import { Button } from "@mui/material";
import LazyImage from "./LazyImage";

interface DataDisplayProps {
  assets: FinalAssets[];
}

const DataDisplay: React.FC<DataDisplayProps> = ({ assets }) => {
  const [selectedToCheckPrice, setSelectedToCheckPrice] = useState<
    FinalAssets[]
  >([]);

  const handleCardClick = useCallback((selectedAsset: FinalAssets) => {
    setSelectedToCheckPrice((prevSelectedAssets) => {
      const isAssetSelected = prevSelectedAssets.some(
        (asset) => asset.key === selectedAsset.key
      );
      if (isAssetSelected) {
        return prevSelectedAssets.filter(
          (asset) => asset.key !== selectedAsset.key
        );
      } else {
        return [...prevSelectedAssets, selectedAsset];
      }
    });
  }, []);

  return (
    <>
      <Button
        variant="contained"
        sx={ButtonStyles(selectedToCheckPrice.length)}
      >
        Load Price Selected Items: {selectedToCheckPrice.length}
      </Button>
      <Box sx={Styles}>
        <Grid container spacing={2}>
          {assets.map((asset) => (
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
                  <LazyImage
                    src={`https://community.cloudflare.steamstatic.com/economy/image/${asset.icon_url}`}
                    alt="item"
                  />
                </div>
                <Typography>{asset.amount}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default DataDisplay;
