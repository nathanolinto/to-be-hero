import { Routes as RoutesDom, Route, BrowserRouter } from 'react-router-dom';

import Logon from './pages/Logon';

export default function Routes() {
    return (
        <BrowserRouter>
            <RoutesDom>
                <Route path="/" element={<Logon />} />
            </RoutesDom>
        </BrowserRouter>
    );
}
