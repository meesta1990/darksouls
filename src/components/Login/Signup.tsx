import { Card, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import Page from "../Page/Page";
import './Sign.css';
import {logout, signUp, sendVerification, checkUsernameAvaibility} from "../../services/User/ServiceUser";
import { Link } from "react-router-dom";
import { ROUTER_SIGNIN } from "../../utils/Constants";

const Signin = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [emailError, setEmailError] = useState<boolean>(false);
    const [usernameError, setUsernameError] = useState<boolean>(false);
    const [passwordError, setPasswordError ] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const handleSignUp = () => {
        setError('');

        if (email.length === 0) {
            setEmailError(true);
            return;
        } else {
            setEmailError(false);
        }
        if (username.length === 0) {
            setUsernameError(true);
            return;
        } else {
            setUsernameError(false);
        }
        if (password.length === 0) {
            setPasswordError(true);
            return;
        } else {
            setPasswordError(false);
        }
        setLoading(true);

        checkUsernameAvaibility(username).then(() => {
            signUp(email, username, password).then(() => {
                sendVerification()
                    .then(() => {
                        setSuccess('An email was sent to your address. Please confirm it before proceed to login');
                        logout();
                    });
            }).catch((error) => {
                setError(error);
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
                    {!success &&
                        <>
                            <TextField
                                label="Username"
                                required
                                type="text"
                                autoComplete="new-password"
                                error={usernameError}
                                variant="outlined"
                                color="secondary"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField
                                label="Email"
                                required
                                type="email"
                                error={emailError}
                                autoComplete="new-password"
                                variant="outlined"
                                color="secondary"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                label="Password"
                                required
                                type="password"
                                error={passwordError}
                                autoComplete="new-password"
                                variant="outlined"
                                color="secondary"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <TextField
                                label="Confirm Password"
                                required
                                type="password"
                                error={passwordError}
                                autoComplete="new-password"
                                variant="outlined"
                                color="secondary"
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <LoadingButton
                                loading={loading}
                                loadingPosition="start"
                                variant="outlined"
                                onClick={handleSignUp}
                            >
                                Sign up
                            </LoadingButton>
                        </>
                    }

                    <Link to={ROUTER_SIGNIN} >
                        Sign in
                    </Link>

                    {error &&
                        <p className="error">
                            {error}
                        </p>
                    }

                    {success &&
                    <p className="success">
                        {success}
                    </p>
                    }

                </Card>
            </div>
        </Page>
    );
}

export default Signin;
