import { blue, deepOrange, grey, orange } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { dark } from "@mui/material/styles/createPalette";

const DefaultTheme = createTheme({
  palette: {
    text: {
      primary: "#000",
    },
    primary: {
      main: "#f8f8f2",
      dark: "#EAEAEA",
      contrastText: "#000",
    },
    main: {
      main: "#393E46",
      dark: "#e04300",
      light: "#ff5b14",
      contrastText: "#fff",
    },
    milk: {
      main: "#F7F5F2",
      dark: "#d4d2cf",
      light: "#ffffff",
      contrastText: "#212121",
    },
    teal: {
      main: "#069A8E",
    },
    yellow: {
      main: "#F8B400",
    },
    dark: {
      main: "#050505",
      dark: "#30302e",
      light: "#fff",
      contrastText: "#fff",
    },
    gray: {
      main: "#8D8DAA",
      dark: "#383838",
      light: "#fff",
      contrastText: "#fff",
    },
    darkBlue: {
      main: blue[900],
    },
    orange: {
      main: orange[600],
    },
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: "0.9rem",
          borderRadius: 15,
          textTransform: "unset",
          fontWeight: 400,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Quicksand",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "#fff",
          "&:hover .MuiOutlinedInput-notchedOutline ": {
            borderColor: "#909090",
          },
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff",
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },
  },
});

export default DefaultTheme;
