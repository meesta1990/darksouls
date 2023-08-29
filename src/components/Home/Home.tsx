import { Button, ThemeProvider } from '@mui/material';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Page from '../Page/Page';
import './Home.css'
import { ROUTER_CREATE_SESSION, ROUTER_SESSIONS, theme } from '../../utils/Constants';
import { logout } from "../../services/User/ServiceUser";
import { useAppSelector } from "../../store/hooks";

const Home = () => {
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.userReducer.user);

    return (
        <Page className="homepage">
            <div className="button-container">
                <ThemeProvider theme={theme}>
                    <Button variant="outlined" size="large" color="primary" onClick={()=>navigate(ROUTER_CREATE_SESSION)}>
                        Create new session
                    </Button>
                    <Button variant="outlined" size="large" color="primary" onClick={() => navigate(ROUTER_SESSIONS)}>
                        Join session
                    </Button>
                    <Button variant="outlined" size="large" color="primary" onClick={logout}>
                        Logout
                    </Button>
                </ThemeProvider>
            </div>
        </Page>
    )
}

export default Home;
