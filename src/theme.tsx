import { createTheme } from '@mui/material/styles'

export const MainColor = 'rgb(0, 128, 128)'
export const SecondaryColor = 'rgb(166 209 211)'

const defaultTheme = createTheme({
    palette: {
        mode: 'light',
        action: {
            active: MainColor,
        },
        primary: {
            main: MainColor,
            contrastText: '#fafafa',
        },
        secondary: {
            main: SecondaryColor,
            contrastText: 'rgba(255,255,255,0.87)',
        },
        warning: {
            main: '#ffb300',
            contrastText: '#fafafa',
        },
        success: {
            main: 'rgb(33, 136, 56)',
            light: 'rgb(93, 162, 113)',
            contrastText: '#fafafa',
        },
        info: {
            main: 'rgb(140, 139, 139)',
            contrastText: '#fafafa',
        },
    },
})

export default defaultTheme
