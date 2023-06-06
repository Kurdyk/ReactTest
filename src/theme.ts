import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';


// A custom theme for this app
const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#1e90ff',
    },
    error: {
      main: red.A400,
    },
    background: {
        paper: '#fff',
      },
    text: {
        primary: "#000",
        secondary: "#FFF"
    },
    info:{
        main:"#FFF",
    },
  },
});


export default muiTheme;