// CachedData.tsx
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import { BoxStyles } from "./styles/CachedDataStyles";
import { getKeysWithPrefix } from "./utils/localStorage";

const CachedData = () => {
  const cachedData = getKeysWithPrefix("Items:");
  return (
    <Box sx={BoxStyles}>
      <Autocomplete
        id="combo-box-demo"
        options={cachedData}
        renderInput={(params) => (
          <TextField {...params} label="Cached inventory" />
        )}
      />
      <Button variant="contained">Load</Button>
    </Box>
  );
};

export default CachedData;
