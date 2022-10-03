import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import AccountSettingsScreen from './screens/AccountSettingsScreen';
import Button from '@material-ui/core/Button';
import {useAuth} from './auth/AuthContext';
import {useAuthenticatedUser} from './auth/UserContext';
import {updateProfile} from 'firebase/auth';

function AuthenticatedApp(): JSX.Element {
    const auth = useAuth();
    const user = useAuthenticatedUser();

    function clickHandler() {
        updateProfile(user, {displayName: null});
        auth.logout();
    }

    return (
        <div>
            <Button onClick={clickHandler} variant="contained" fullWidth={false}>
                Sign Out
            </Button>
            <Router>
                <Switch>
                    <Route path={'/settings'} component={AccountSettingsScreen} />
                    <Route component={HomeScreen} />
                </Switch>
            </Router>
        </div>
    );
}

export default AuthenticatedApp;
