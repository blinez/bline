import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';

function AuthenticatedApp() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route component={LoginScreen} />
                </Switch>
            </Router>
        </div>
    );
}

export default AuthenticatedApp;
