import React from 'react';
import {useAuthenticatedUser} from '../../auth/UserContext';
import {useHistory} from 'react-router-dom';

function HomeScreen() {
    const user = useAuthenticatedUser();
    const history = useHistory();

    if (user.displayName == null) {
        history.push('/settings');
    }

    return (
        <>
            <h1>You are now logged in, {user.displayName}.</h1>
        </>
    );
}

export default HomeScreen;
