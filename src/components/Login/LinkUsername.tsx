import { Button, Card, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import Page from "../Page/Page";
import './Sign.css';
import {
    checkUsernameAvaibility,
    linkUsername,
} from "../../services/User/ServiceUser";
import { Link, useNavigate } from "react-router-dom";
import { ROUTER_HOME } from "../../utils/Constants";
import {User} from "../../entities/User";
import {useAppSelector} from "../../store/hooks";

const LinkUsername = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const user = useAppSelector((state) => state.userReducer.user);

    const handleLinkUsername = () => {
        setUsernameError(false);

        if (username.trim().length === 0) {
            setUsernameError(true);
            return;
        }
        setLoading(true);

        checkUsernameAvaibility(username).then(() => {
            linkUsername(new User(user), username).then(() => {
                navigate(ROUTER_HOME);
            }).finally(() => {
                setLoading(false);
            })
        }).catch((error) => {
            setError(error);
        }).finally(() => {
            setLoading(false);
        })

    }

    return (
        <Page className="sign">
            <div className="wrapper-signin">
                <Card variant="outlined" className="card-sign">
                    <TextField
                        label="Username"
                        required
                        type="string"
                        autoComplete="new-password"
                        error={usernameError}
                        variant="outlined"
                        color="secondary"
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <LoadingButton
                        loading={loading}
                        loadingPosition="start"
                        variant="outlined"
                        onClick={handleLinkUsername}
                    >
                        Link username
                    </LoadingButton>

                    <p className="error">
                        {error}
                    </p>
                </Card>
            </div>
        </Page>
    );
}

export default LinkUsername;
