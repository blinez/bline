import React, {ReactNode} from 'react';
import {useAuth} from './AuthContext';
import * as firebase from 'firebase';

const UserContext = React.createContext<firebase.User | null>(null);

function UserProvider(props: {children: ReactNode}) {
    const auth = useAuth();
    return <UserContext.Provider value={auth.user} {...props} />;
}

function useUser(): firebase.User | null {
    return React.useContext(UserContext);
}

function useAuthenticatedUser(): firebase.User {
    const user = React.useContext(UserContext);
    if (user === null) {
        throw new Error(`useAuthenticatedUser must be used within AuthenticatedApp`);
    }
    return user;
}

export {UserProvider, useUser, useAuthenticatedUser};
