import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import DataProvider from "./DataProvider";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import { useState, useRef } from "react";

const SteamForm = () => {
  const [steamId, setSteamId] = useState<string>("");
  const steamIdInputRef = useRef<HTMLInputElement>(null);
  const [gameId, setGameId] = useState<string>("");
  const gameIdInputRef = useRef<HTMLInputElement>(null);

  const GamesID = [
    {
      label: "CS:GO",
      value: "730",
    },
    {
      label: "Rust",
      value: "252490",
    },
    {
      label: "Dota 2",
      value: "570",
    },
    {
      label: "Team Fortress 2",
      value: "440",
    },
    {
      label: "Don't Starve Together",
      value: "322330",
    },
  ];

  const buttonHandler = () => {
    const newSteamId = steamIdInputRef.current?.value || "";
    setSteamId(newSteamId);
    const selectedGame = GamesID.find(
      (game) => game.label === gameIdInputRef.current?.value
    );
    const newGameId = selectedGame ? selectedGame.value : "";
    setGameId(newGameId);
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
          "& .MuiGrid-container": {
            textAlign: "center",
            justifyContent: "center",
          },

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
          "& .MuiAutocomplete-root": {
            margin: "0.5rem",
            width: "17rem",
          },
        }}
      >
        <h1>Provide STEAM ID</h1>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <TextField
              inputRef={steamIdInputRef}
              id="outlined-basic"
              label="user ID"
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={GamesID}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              renderInput={(params) => (
                <TextField {...params} label="Game" inputRef={gameIdInputRef} />
              )}
            />
          </Grid>
        </Grid>
        <Button variant="contained" onClick={buttonHandler}>
          Find inventory
        </Button>
      </Box>
      {steamId !== "" && gameId !== "" && (
        <DataProvider inputValue={steamId} autoComValue={gameId} />
      )}
    </>
  );
};

export default SteamForm;
