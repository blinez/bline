import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import {useAuth} from './auth/AuthContext';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/styles';
import Background from './sunrise.jpg';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(() => ({
    root: {
        textAlign: 'center',
        backgroundImage: `url(${Background})`,
        height: '100%',
        padding: '10%',
    },
    outlet: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        color: '#fff',
        maxWidth: '800px',
        padding: '10px',
        margin: 'auto',
    },
}));

function UnauthenticatedApp(): JSX.Element {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Paper className={classes.outlet}>
                <Router>
                    <Switch>
                        <Route path={'/finishSignUp'} component={EmailSignIn} />
                        <Route component={LoginScreen} />
                    </Switch>
                </Router>
            </Paper>
        </div>
    );
}

function EmailSignIn() {
    const auth = useAuth();
    const item: string | null = localStorage.getItem('emailForSignIn');
    const [email, setEmail] = useState(item);
    const [input, setInput] = useState('');

    useEffect(() => {
        if (email !== null) {
            const emailLink = window.location.href;
            auth.emailLogin(email, emailLink);
        } else {
            console.log('email is null');
        }
    }, [email, auth]);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => setInput(event.target.value);
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        // do not reload page on form submit
        event.preventDefault();
        setEmail(input);
    };

    if (email === null) {
        return (
            <>
                <h1>Confirm email</h1>
                <form onSubmit={onSubmit}>
                    <TextField
                        name="email"
                        required={true}
                        fullWidth={true}
                        value={input}
                        onChange={onChange}
                        type="text"
                        margin="normal"
                        variant="outlined"
                        label="Email"
                    />
                    <Button variant="contained" type="submit" fullWidth={true}>
                        Send Email
                    </Button>
                </form>
            </>
        );
    } else {
        return <h1>Signing you in...</h1>;
    }
}

export default UnauthenticatedApp;
