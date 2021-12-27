import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import CreateSession from './components/Session/CreateSession';
import {
    ROUTER_CREATE_SESSION,
    ROUTER_SESSION,
    ROUTER_HOME,
    ROUTER_SIGNIN,
    ROUTER_SIGNUP,
    ROUTER_FORGOT_PASSWORD
} from './utils/Constants';
import SessionView from "./components/Session/SessionView";
import Signin from "./components/Login/Signin";
import Signup from "./components/Login/Signup";
import { auth } from "./utils/Firebase";
import { useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Page from "./components/Page/Page";
import ForgotPassword from "./components/Login/ForgotPassword";

function App() {
    const [loggedUser, setLoggedUser] = useState<any>(undefined);

    auth.onAuthStateChanged((user) => {
        setLoggedUser(user);
    });

    if(loggedUser === undefined) return <Page />
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path={ROUTER_HOME}
                    element={
                        <ProtectedRoute user={loggedUser}>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path={ROUTER_CREATE_SESSION}
                    element={
                        <ProtectedRoute user={loggedUser}>
                            <CreateSession user={loggedUser} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path={ROUTER_SESSION + '/:sessionID'}
                    element={
                        <ProtectedRoute user={loggedUser}>
                            <SessionView user={loggedUser} />
                        </ProtectedRoute>
                    }
                />

                <Route path={ROUTER_SIGNIN} element={<Signin />} />
                <Route path={ROUTER_SIGNUP} element={<Signup />} />
                <Route path={ROUTER_FORGOT_PASSWORD} element={<ForgotPassword />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
