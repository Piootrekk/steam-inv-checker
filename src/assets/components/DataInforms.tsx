import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Styles } from "./styles/DataInformsStyles";

interface DataInformsProps {
  isLoading: boolean;
  isError: boolean;
  inputValue: string;
  autoComValue: string;
}

const DataInforms: React.FC<DataInformsProps> = ({
  isLoading,
  isError,
  inputValue,
  autoComValue,
}) => {
  return (
    <Box sx={Styles}>
      <h1>Data from Steam API</h1>
      <p>SteamId: {inputValue}</p>
      <p>AppId: {autoComValue}</p>

      {isLoading && <CircularProgress />}
      {isError && (
        <div className="errorClass">
          <ErrorOutlineIcon />
          <label>Error fetching data from Steam API</label>
          <ErrorOutlineIcon />
        </div>
      )}
    </Box>
  );
};

export default DataInforms;
