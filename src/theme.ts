//import { createTheme } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';


export const theme = createMuiTheme({
  palette: {
    background: {
      default: "#FFF",
     // emphasis: "#E8EAF6",
      //secondary: "#C5CAE9",
      //header: "#121037"
  },    
    primary: {
      main: '#000a12',
      dark: '#4a4a4a',
    },
    secondary: {
      main: '#078171',
      dark: '#06695c',
    },
  },
  typography: {
    fontSize: 14,
  },
  overrides: {
    MuiButton: {
      root: {
        fontFamily: 'Arial, Tahoma, sans-serif',
        fontWeight: 'bold',
        textTransform: 'none',
        transition: 'none',
        boxShadow: 'none',
      },
      contained: {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        },
      },
      outlinedPrimary: {
        '&:hover': {
          backgroundColor: 'inherit',
        },
      },
    },
    MuiTypography: {
      h2: {
        fontWeight: 'bold',
        fontSize: '22px',
        lineHeight: '26px',
        color: '#2c2c2c',
      },
      h3: {
        fontWeight: 'bold',
        fontSize: '16px',
        lineHeight: '20px',
        color: '#2c2c2c',
      },
      subtitle1: {
        fontSize: '14px',
        lineHeight: '18px',
        color: '#4a4a4a',
      },
      subtitle2: {
        fontWeight: 'bold',
      },
    },
  },
});
