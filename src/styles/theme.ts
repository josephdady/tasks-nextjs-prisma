import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif",
    body1: {
      fontSize: "0.75rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
  },
  palette: {
    primary: {
      main: "#0F52BA",
    },
    text: {
      primary: "#101828",
      secondary: "#475467",
      disabled: "#98A2B3",
    },
  },
  //override Mui components
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: "#EEF2F8",
        },
      },
    },
  },
});
export default theme;
