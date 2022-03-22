import { createTheme } from '@mui/material/styles';;

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#7a7a7a',
    },
    background: {
      default: '#151515',
    },
    error: {
      main: '#e86886',
    },
    success: {
      main: '#48d597',
    },
    info: {
      main: '#4969f6',
    },
    divider: '#30373b',
  },
  typography: {
    fontFamily: [
      'Inter',
      "sans-serif",
    ].join(','),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#6b6b6b #2b2b2b",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#2b2b2b",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#6b6b6b",
            minHeight: 24,
            border: "3px solid #2b2b2b",
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "#2b2b2b",
          },
        },
      },
    },
  },
});

export default theme;