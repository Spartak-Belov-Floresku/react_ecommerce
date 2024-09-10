import {
    Routes,
    Route,
    Navigate
} from 'react-router-dom';

import { Navigation } from './routes/navigation/navigation.component';
import { Home } from './routes/home/home.component';
import { Authentication } from './routes/authentication/authentication.component';

export const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigation />}>
                <Route index element={<Home />} />
                <Route path='auth' element={<Authentication />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
}