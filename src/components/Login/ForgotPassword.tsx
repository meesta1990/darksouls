import {Button, Card, TextField} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import Page from "../Page/Page";
import './Sign.css';
import {useNavigate} from "react-router-dom";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    return (
        <Page className="sign">
            <div className="wrapper-signin">
                <Card variant="outlined" className="card-sign">
                    <TextField
                        label="Email"
                        required
                        type="email"
                        error={emailError}
                        variant="outlined"
                        color="secondary"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <LoadingButton
                        loading={loading}
                        loadingPosition="start"
                        variant="outlined"
                    >
                        Reset my password
                    </LoadingButton>

                    <p className="error">
                        {error}
                    </p>
                </Card>
            </div>
        </Page>
    );
}

export default ForgotPassword;
