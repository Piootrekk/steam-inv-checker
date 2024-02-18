import React, { useState, useCallback } from "react";
import { FinalAssets } from "./interfaces/FinalAssets";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Styles, BoxStyles, ButtonStyles } from "./styles/DataDisplayStyles";
import { Button } from "@mui/material";
import LazyImage from "./LazyImage";
import PriceProvider from "./PriceProvider";

interface DataDisplayProps {
  assets: FinalAssets[];
  autoComValue: string;
}

const DataDisplay: React.FC<DataDisplayProps> = ({ assets, autoComValue }) => {
  const [selectedItems, setSelectedItems] = useState<FinalAssets[]>([]);
  const [sendSelected, setSendSelected] = useState<FinalAssets[]>([]);

  const handleCardClick = useCallback((selectedAsset: FinalAssets) => {
    setSelectedItems((prevSelectedAssets) => {
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

  const buttonHandler = () => {
    setSendSelected([...selectedItems]);
  };

  const selectAll = () => {
    setSelectedItems(assets);
  };

  const unselectAll = () => {
    setSelectedItems([]);
  };

  const selectMarketable = () => {
    const marketableAssets = assets.filter((asset) => asset.marketable);
    setSelectedItems(marketableAssets);
  };

  return (
    <>
      <Button
        variant="contained"
        sx={ButtonStyles(selectedItems.length)}
        onClick={buttonHandler}
      >
        {`Fetch price ${selectedItems.length} items`}
      </Button>
      <Box sx={Styles}>
        <div className="selectButtons">
          <Button variant="contained" color="success" onClick={selectAll}>
            Select All
          </Button>
          <Button variant="contained" color="success" onClick={unselectAll}>
            Unselect All
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={selectMarketable}
          >
            Select Marketable
          </Button>
        </div>

        <Grid container spacing={2}>
          {assets.map((asset) => (
            <Grid item key={asset.key}>
              <Card
                sx={BoxStyles(
                  asset.name_color,
                  asset.marketable,
                  selectedItems.some(
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
      {sendSelected.length > 0 && (
        <PriceProvider assets={sendSelected} autoComValue={autoComValue} />
      )}
    </>
  );
};

export default DataDisplay;
