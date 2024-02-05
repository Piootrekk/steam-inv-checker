// DataDisplayStyles.ts

export const Styles = {
  margin: "3rem",
  padding: "0.5rem",
  boxShadow: "0 2px 5px rgba(0,0,0,0.5)",
  borderRadius: "10px",
  textAlign: "center",

  "& .MuiGrid-container": {
    justifyContent: "center",
    marginTop: "1rem",
  },

  "& .MuiGrid-item": {},
  "& .MuiCard-root": {
    padding: "0.5rem",
    transition: "transform 0.3s, rotate 0.3s 0.5s, box-shadow 0.3s",
    "&:hover": {
      transform: "scale(1.15) rotate(2deg)",
      boxShadow: "0 5px 15px rgba(0,0,0,0.5)",
    },
  },
  "& img": {
    width: "6rem",
    height: "6rem",
    margin: "auto",
  },
};
