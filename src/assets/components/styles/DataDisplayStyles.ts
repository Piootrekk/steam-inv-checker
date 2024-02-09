// DataDisplayStyles.ts

export const Styles = {
  margin: "1rem",
  padding: "0.5rem",
  boxShadow: "0 2px 5px rgba(0,0,0,0.5)",
  borderRadius: "10px",
  textAlign: "center",
  position: "relative",

  "& .MuiGrid-container": {
    justifyContent: "center",
    marginTop: "1rem",
  },

  "& .MuiGrid-item": {},
  "& .MuiCard-root": {
    transform: "scale(1) rotate(0)",
    boxShadow: "0 0 0 rgba(0,2,3,0)",
    transition: "transform 0.3s",
    position: "relative",
    padding: "0.5rem",

    "&::before": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },

    "&:hover": {
      transform: "scale(1.15) rotate(2deg)",
      boxShadow: "0 5px 5px rgba(0,2,3,1)",
    },
  },
  "& .imgDiv": {
    width: "6rem",
    height: "6rem",
    margin: "auto",
  },
  "& .MuiButtonBase-root": {
    padding: "0.75rem",
    marginBottom: "2rem",
  },
};

export const BoxStyles = (
  backgroundColor: string,
  marketable: number | boolean,
  selected: boolean
) => ({
  backgroundColor: `#${backgroundColor}`,
  "&:hover": {
    cursor: marketable === 1 ? "pointer" : "not-allowed",
  },
  "&::before": {
    border: selected ? "3px solid blue" : "none",
    background: selected ? "rgba(0, 0, 0, 0.25)" : "none",
  },
});

export const ButtonStyles = (arrSize: number) => ({
  visibility: arrSize > 0 ? "visible" : "hidden",
  margin: "auto",
  marginTop: "3rem",
  padding: "0.75rem",
  display: "block",
  width: "30%",
  height: "auto",
});
