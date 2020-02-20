import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';

function AuthenticatedApp() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route component={HomeScreen} />
                </Switch>
            </Router>
        </div>
    );
}

export default AuthenticatedApp;
