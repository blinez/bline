import React, {ReactNode} from 'react';
import {AuthProvider} from './auth/AuthContext';
import {UserProvider} from './auth/UserContext';

function AppProviders(props: {children: ReactNode}) {
    return (
        <AuthProvider>
            <UserProvider>{props.children}</UserProvider>
        </AuthProvider>
    );
}

export default AppProviders;
