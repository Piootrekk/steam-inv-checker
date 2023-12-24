import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import DataProvider from "./DataProvider";
import { useState, useRef } from "react";

const SteamForm = () => {
  const [steamId, setSteamId] = useState<string>("");
  const steamIdInputRef = useRef<HTMLInputElement>(null);

  const buttonHandler = () => {
    const newSteamId = steamIdInputRef.current?.value || "";
    setSteamId(newSteamId);
    steamIdInputRef.current!.value = "";
  };
  return (
    <>
      <Box
        sx={{
          border: 1,
          margin: "1rem",
          padding: "1rem",
          textAlign: "center",
          boxShadow: "0 0 10px rgba(0,0,0,0.5)",
          borderRadius: "10px",
          "& .MuiTextField-root": {
            margin: "0.5rem",

            "& input": {
              height: "1rem",
              width: "30rem",
            },
          },
          "& .MuiButton-root": {
            margin: "0.5rem",
            width: "10rem",
            height: "3rem",
          },
        }}
      >
        <h1>Provide STEAM ID</h1>
        <TextField
          inputRef={steamIdInputRef}
          id="outlined-basic"
          label="user ID"
          variant="outlined"
        />
        <Button variant="contained" onClick={buttonHandler}>
          Find inventory
        </Button>
        {steamId !== "" && <DataProvider inputValue={steamId} />}
      </Box>
    </>
  );
};

export default SteamForm;
