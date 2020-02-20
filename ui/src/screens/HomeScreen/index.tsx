import Button from '@material-ui/core/Button';
import React from 'react';
import {useAuth} from '../../auth/AuthContext';
import {useAuthenticatedUser} from '../../auth/UserContext';

function HomeScreen() {
    const auth = useAuth();
    const user = useAuthenticatedUser();

    function clickHandler() {
        auth.logout();
    }
    return (
        <>
            <h1>You are now logged in, {user.email}.</h1>
            <Button onClick={clickHandler} variant="contained" fullWidth={false}>
                Sign Out
            </Button>
        </>
    );
}

export default HomeScreen;
