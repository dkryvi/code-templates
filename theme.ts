import {indigo, red, teal} from '@mui/material/colors'
import {createTheme} from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500]
    },
    secondary: {
      main: teal[500]
    },
    error: {
      main: red.A400
    }
  }
})

export default theme
