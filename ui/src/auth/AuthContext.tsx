import React, {ReactNode, useContext, useEffect, useState} from 'react';
import {emailLogin, logout, sendEmailLink} from './authClient';
import {fbBline} from '../firebase/firebase';
import useLocalStorage from '../hooks/useLocalStorage';
import {getAuth, onAuthStateChanged, User} from 'firebase/auth';

export interface Auth {
    firebaseAuth: User | null;
}

const defaultState = {
    user: null,
    sendEmailLink: sendEmailLink,
    emailLogin: emailLogin,
    logout: logout,
};

const AuthContext = React.createContext<{
    user: User | null;
    sendEmailLink: (email: string) => Promise<void>;
    emailLogin: (email: string, emailLink: string) => Promise<void>;
    logout: () => Promise<void>;
}>(defaultState);

function AuthProvider(props: {children: ReactNode}): JSX.Element {
    const [userFromStorage, setUserInStorage] = useLocalStorage<User | null>('authedUser', null);
    const [auth, setAuth] = useState<Auth>({firebaseAuth: userFromStorage});

    useEffect(() => {
        const fbAuth = getAuth(fbBline);
        return onAuthStateChanged(fbAuth, (firebaseAuth: User | null) => {
            setUserInStorage(firebaseAuth);
            setAuth({firebaseAuth});
        });
        // We only subscribe to authStateChanges once - no matter what.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <AuthContext.Provider value={{...defaultState, user: auth.firebaseAuth}} {...props} />;
}

function useAuth() {
    return useContext(AuthContext);
}

export {AuthProvider, useAuth};
