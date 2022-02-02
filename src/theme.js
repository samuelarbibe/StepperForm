import { createTheme } from '@material-ui/core/styles'

const theme = createTheme({
  props: {
    MuiButton: {
      disableElevation: true,
    },
  },
  overrides: {
    MuiTab: {
      root: {
        textTransform: 'none',
      }
    },
    MuiButton: {
      root: {
        textTransform: 'none',
        borderRadius: '3px',
      },
    },
    MuiListItem: {
      root: {
        width: 'auto',
        paddingTop: '3px',
        paddingBottom: '3px',
        borderRadius: '3px',
        margin: '0px 8px 0px 8px'
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: '28px',
        fontSize: '17px',
        color: '#223eab',
      }
    }
  },
  palette: {
    background: {
      default: '#f5f6f9',
      dark: '#222'
    },
    primary: {
      main: '#223eab',
      light: '#e7efff'
    }
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      '"Fira Sans"',
      '"Droid Sans"',
      '"Helvetica Neue"',
      'sans-serif'
    ].join(','),
    h1: {
      fontSize: '40px',
      fontWeight: 600
    },
    h2: {
      fontSize: '32px',
      fontWeight: 600
    },
    h3: {
      fontSize: '21px',
      fontWeight: 600
    },
    body1: {
      fontSize: '17px',
      fontWeight: 400,
      color: '#1d1d1f'
    },
    body2: {
      color: 'rgba(0, 0, 0, 0.54)',
      margin: 0,
      fontSize: '0.75rem',
      marginTop: '3px',
      textAlign: 'left',
      fontWeight: 400,
      lineHeight: 1.66,
    }
  },
})

export default theme