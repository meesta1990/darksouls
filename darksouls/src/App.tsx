import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import CreateSession from './components/Session/CreateSession';
import { ROUTER_CREATE_SESSION } from './utils/Constants';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path={ROUTER_CREATE_SESSION} element={<CreateSession />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
