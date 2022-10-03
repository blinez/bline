import React, {ReactNode} from 'react';
import {useAuth} from './AuthContext';
import {User} from 'firebase/auth';

const UserContext = React.createContext<User | null>(null);

function UserProvider(props: {children: ReactNode}) {
    const auth = useAuth();
    return <UserContext.Provider value={auth.user} {...props} />;
}

function useUser(): User | null {
    return React.useContext(UserContext);
}

function useAuthenticatedUser(): User {
    const user = React.useContext(UserContext);
    if (user === null) {
        throw new Error(`useAuthenticatedUser must be used within AuthenticatedApp`);
    }
    return user;
}

export {UserProvider, useUser, useAuthenticatedUser};
