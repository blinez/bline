import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import AppProviders from './AppProviders';
import CssBaseline from '@material-ui/core/CssBaseline';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import {MuiThemeProvider} from '@material-ui/core';
import createPalette from '@material-ui/core/styles/createPalette';
import './index.css';

const theme = {
    palette: createPalette({
        background: {
            default: '#303030',
        },
    }),
};

ReactDOM.render(
    <AppProviders>
        <MuiThemeProvider theme={createMuiTheme(theme)}>
            <CssBaseline>
                <App />
            </CssBaseline>
        </MuiThemeProvider>
    </AppProviders>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
