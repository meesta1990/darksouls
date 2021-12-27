import { Button, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Page from '../Page/Page';
import './Home.css'
import { ROUTER_CREATE_SESSION, theme } from '../../utils/Constants';
import Sessions from './Sessions';
import { logout } from "../../services/User/ServiceUser";


const Home = () => {
    const navigate = useNavigate();
    const [choosedContent, setChoosedContent] = useState<string>();

    return (
        <Page className="homepage">
            <div className="button-container">
                <ThemeProvider theme={theme}>
                    <Button variant="outlined" size="large" color="primary" onClick={()=>navigate(ROUTER_CREATE_SESSION)}>
                        Create new session
                    </Button>
                    <Button variant="outlined" size="large" color="primary" onClick={() => setChoosedContent('list_sessions')}>
                        Join session
                    </Button>
                    <Button variant="outlined" size="large" color="primary" onClick={logout}>
                        Logout
                    </Button>
                </ThemeProvider>
            </div>

            <div className="choosed-content">
                {
                    choosedContent === 'list_sessions'  && <Sessions />
                }
            </div>
        </Page>
    )
}

export default Home;
