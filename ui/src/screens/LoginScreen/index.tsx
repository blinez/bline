import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useAuth} from '../../auth/AuthContext';
import {makeStyles} from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(() => ({
    widget: {
        padding: '10px',
        width: '800px',
        margin: 'auto',
        marginTop: '10%'
    }
}));

function LoginScreen() {
    const classes = useStyles();
    const auth = useAuth();
    const [email, setEmail] = useState('');

    const updateValue = (event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);
    const sendEmailLink = (event: FormEvent<HTMLFormElement>) => {
        // do not reload page on form submit:
        event.preventDefault();

        return auth.sendEmailLink(email);
    };

    return (
        <Paper className={classes.widget}>
            <p>To sign in, provide an e-mail address, and we will send you a login link.</p>
            <form onSubmit={sendEmailLink}>
                <TextField
                    name="email"
                    required={true}
                    fullWidth={true}
                    value={email}
                    onChange={updateValue}
                    type="text"
                    margin="normal"
                    variant="outlined"
                    label="Email"
                />
                <Button variant="contained" type="submit" fullWidth={false}>
                    Send Email
                </Button>
            </form>
        </Paper>
    );
}

export default LoginScreen;
