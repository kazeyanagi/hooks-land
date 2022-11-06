import { createTheme } from '@mui/material/styles';
import { blueGrey } from '@mui/material/colors';

export const theme = createTheme({
  typography: {
    h1: {
      fontSize: '2rem',
      fontWeight: 700
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 700
    },
    h3: {
      fontSize: '1.17rem',
      fontWeight: 700
    },
    h4: {
      fontSize: '1rem',
      fontWeight: 700
    },
    h5: {
      fontSize: '.83rem',
      fontWeight: 700
    },
    h6: {
      fontSize: '.67rem',
      fontWeight: 700
    },
  },
  palette: {
    background: {
      default: blueGrey[50]
    }
  }
})