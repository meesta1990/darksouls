import { createTheme } from '@mui/material/styles';

export const TABLE_SESSIONS = 'sessions';
export const TABLE_CLASSES = 'classes';

export const theme = createTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#e16410',
            main: '#e16410',
            dark: '#502105',
            contrastText: '#FFF'
        },
    },
});

export const ROUTER_CREATE_SESSION = 'create-session';