import { blue, deepOrange, grey, orange } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { dark } from '@mui/material/styles/createPalette';

const DefaultTheme = createTheme({
  palette: {
    background: {
      default: grey[800],
      paper: grey[800],
    },
    text: {
      primary: '#fff',
      secondary: grey[500],
    },
    secondary: {
      main: '#FF2626',
      dark: '#d42020',
      light: '#db2323',
      contrastText: '#fff',
    },
    main: {
      main: '#393E46',
      dark: '#e04300',
      light: '#ff5b14',
      contrastText: '#fff',
    },
    milk: {
      main: '#F7F5F2',
    },
    teal: {
      main: '#069A8E'
    },
    yellow: {
      main: '#F8B400'
    },
    dark: {
      main: '#050505',
      dark: '#30302e',
      light: '#fff',
      contrastText: '#fff',
    },
    gray: {
      main: '#8D8DAA',
      dark: '#383838',
      light: '#fff',
      contrastText: '#fff',
    },
    darkBlue: {
      main: blue[900]
    }, orange: {
      main: orange[600]
    }
  },
});

export default DefaultTheme