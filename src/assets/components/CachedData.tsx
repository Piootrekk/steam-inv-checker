// CachedData.tsx
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import { BoxStyles } from "./styles/CachedDataStyles";
import { getKeysWithPrefix } from "./utils/localStorage";
import { useState } from "react";
import DataInforms from "./DataInforms";
import DataDisplay from "./DataDisplay";

const CachedData = () => {
  const [localStorageData, setLocalStorageData] = useState<any>(null);
  const [selectedKey, setSelectedKey] = useState<string>("");
  const cachedDataKey = getKeysWithPrefix("Items:");
  const [reloadKey, setReloadKey] = useState(0);

  const loadData = () => {
    const data = localStorage.getItem(selectedKey);
    if (data) {
      setLocalStorageData(JSON.parse(data));
    } else {
      setLocalStorageData(null);
    }
    setReloadKey(reloadKey + 1);
  };

  return (
    <>
      <Box sx={BoxStyles}>
        <Autocomplete
          id="combo-box-demo"
          options={cachedDataKey}
          onChange={(_, value) => setSelectedKey(value!)}
          renderInput={(params) => (
            <TextField {...params} label="Cached inventory" />
          )}
        />
        <Button className="buttonForms" variant="contained" onClick={loadData}>
          Load
        </Button>
      </Box>
      {localStorageData && (
        <DataInforms
          isLoading={false}
          isError={false}
          inputValue={localStorageData.steamid}
          autoComValue={localStorageData.appid}
        />
      )}
      {localStorageData && <DataDisplay assets={localStorageData.data} />}
    </>
  );
};

export default CachedData;
