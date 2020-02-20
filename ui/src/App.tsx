import React from 'react';
import UnauthenticatedApp from './UnauthenticatedApp';
import {useUser} from './auth/UserContext';
import AuthenticatedApp from './AuthenticatedApp';

function App() {
    const user = useUser();

    if (user) {
        return <AuthenticatedApp />;
    } else {
        return <UnauthenticatedApp />;
    }
}

export default App;
