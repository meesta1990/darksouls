import {Button, Card, TextField} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import Page from "../Page/Page";
import './Sign.css';
import { logout, signIn, signInWithGoogle } from "../../services/User/ServiceUser";
import { Link, useNavigate } from "react-router-dom";
import { ROUTER_FORGOT_PASSWORD, ROUTER_HOME, ROUTER_SIGNIN, ROUTER_SIGNUP } from "../../utils/Constants";

const Signin = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [emailError, setEmailError] = useState<boolean>(false);
    const [passwordError, setPasswordError ] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleSignIn = () => {
        if (email.length === 0) {
            setEmailError(true);
            return;
        } else {
            setEmailError(false);
        }
        if (password.length === 0) {
            setPasswordError(true);
            return;
        } else {
            setPasswordError(false);
        }

        setError('');
        setLoading(true);
        signIn(email, password).then((user: any) => {
            if (user?.emailVerified) {
                navigate(ROUTER_HOME);
            }else {
                setError('An email was sent to your address. Please confirm it before proceed to login');
                logout();
            }
        }).catch((error) => {
            setError(error?.message);
        }).finally(() => {
            setLoading(false);
        })
    }

    const handleGoogleSignIn = () => {
        setEmailError(false);
        setPasswordError(false);
        setLoading(true);

        signInWithGoogle().then(() => {
            navigate(ROUTER_HOME);
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
                        label="Email"
                        required
                        type="email"
                        error={emailError}
                        variant="outlined"
                        color="secondary"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        required
                        type="password"
                        error={passwordError}
                        variant="outlined"
                        color="secondary"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <LoadingButton
                        loading={loading}
                        loadingPosition="start"
                        variant="outlined"
                        onClick={handleSignIn}
                    >
                        Login
                    </LoadingButton>

                    <LoadingButton
                        loading={loading}
                        loadingPosition="start"
                        variant="outlined"
                        onClick={handleGoogleSignIn}
                    >
                        Login with google
                    </LoadingButton>

                    <Link to={ROUTER_FORGOT_PASSWORD} >
                        I forgot my password
                    </Link>

                    <p className="lbl-signup">
                        Need an account?
                    </p>

                    <Button
                        variant="outlined"
                        onClick={() => navigate(ROUTER_SIGNUP)}
                    >
                        Create an account
                    </Button>

                    <p className="error">
                        {error}
                    </p>
                </Card>
            </div>
        </Page>
    );
}

export default Signin;
