import { Button, Card, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import Page from "../Page/Page";
import './Sign.css';
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/User/ServiceUser";
import { ROUTER_SIGNIN } from "../../utils/Constants";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    const handleResetPassword = () => {
        setLoading(true);
        resetPassword(email).then(() => {
            setSuccessMessage('An email was sent to your address. If you cannot find it, please check in spam');
        }).catch((e) => {
            setError(e);
        }).finally(() => {
            setLoading(false);
        })
    }

    const handleGoBackClick = () => {
        navigate(ROUTER_SIGNIN);
    }

    return (
        <Page className="sign">
            <div className="wrapper-signin">
                <Card variant="outlined" className="card-sign">

                    {successMessage === '' ?
                        <>
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
                                onClick={handleResetPassword}
                                variant="outlined"
                            >
                                Reset my password
                            </LoadingButton>

                            <p className="error">
                                {error}
                            </p>
                        </>
                        :
                        <p className="success">
                            {successMessage}
                        </p>
                    }
                    <Button className="back-button" variant="contained" size="large" color="primary" onClick={handleGoBackClick}>
                        Go back
                    </Button>
                </Card>
            </div>
        </Page>
    );
}

export default ForgotPassword;
