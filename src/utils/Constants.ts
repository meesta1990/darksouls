import { createTheme } from '@mui/material/styles';

export const TABLE_USERS = 'users';
export const TABLE_SESSIONS = 'sessions';
export const TABLE_CLASSES = 'classes';
export const TABLE_BOSSES = 'bosses';

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

export const ROUTER_HOME = '/';
export const ROUTER_SIGNIN = '/signin';
export const ROUTER_SIGNUP = '/signup';
export const ROUTER_FORGOT_PASSWORD = '/reset-password';
export const ROUTER_LINK_USERNAME = '/link-username';
export const ROUTER_CREATE_SESSION = '/create-session';
export const ROUTER_SESSION = '/session';

//game constants:
export const GAME_CONSTANT_MAX_SPARKS = 6;

export const DATE_FORMAT = "HH:mm:ss";