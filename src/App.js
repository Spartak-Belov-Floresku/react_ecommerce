import {
    Routes,
    Route,
    Navigate
} from 'react-router-dom';

import { Navigation } from './routes/navigation/navigation.component';
import { Home } from './routes/home/home.component';
import { SignIn } from './routes/sing-in/sign-in.component';

export const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigation />}>
                <Route index element={<Home />} />
                <Route path='sign-in' element={<SignIn />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
}