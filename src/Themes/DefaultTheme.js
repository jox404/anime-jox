import { blue, deepOrange, grey, orange } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { dark } from "@mui/material/styles/createPalette";

const DefaultTheme = createTheme({
  palette: {
    primary: {
      main: "#f8f8f2",
      dark: "#c7c7c7",
      contrastText: "#000000",
      light: "#ffffff",
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
      main: "#202020",
      dark: "#000",
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
  typography: {
    allVariants: {
      fontFamily: `Quicksand, Ubuntu,"Roboto", "Helvetica", "Arial", sans-serif `,
      fontSize: 18,
      fontWeight: 400,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
    },
    body2: {
      fontSize: 15,
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "0.9rem",
          borderRadius: 15,
          textTransform: "unset",
          fontWeight: 600,
        },
      },
    },
    /* MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: ["Quicksand", ""],
          fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
          fontSize: 14,
          fontWeightLight: 300,
          fontWeightRegular: 400,
          fontWeightMedium: 500,
        },
      },
    }, */
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
