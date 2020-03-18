import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useAuth} from '../../auth/AuthContext';
import {makeStyles} from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(() => ({
    signInForm: {
        maxWidth: '800px',
        padding: '10px',
        margin: 'auto'
    },
    clickableText: {
        color: 'blue',
        textDecoration: 'underline',
        cursor: 'pointer'
    }
}));

function LoginScreen() {
    const classes = useStyles();
    const auth = useAuth();
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    function updateValue(event: ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
        setSubmitted(false);
    }

    async function sendEmailLink() {
        return auth.sendEmailLink(email);
    }

    async function submitHandler(event: FormEvent<HTMLFormElement>) {
        // do not reload page on form submit:
        event.preventDefault();

        await sendEmailLink();
        setSubmitted(true);
    }

    return (
        <Paper className={classes.signInForm}>
            {submitted ? (
                <>
                    <p>We sent a sign-in link to {email}. Please check your inbox. </p>
                    <p>
                        No email in your inbox?{' '}
                        <span onClick={sendEmailLink} className={classes.clickableText}>
                            Send again.
                        </span>
                    </p>
                </>
            ) : (
                <>
                    <h1>Welcome to Bline</h1>
                    <p>To sign in, provide an email address, and we will send you a sign-in link.</p>
                    <form onSubmit={submitHandler}>
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

                        <Button variant="contained" type="submit" fullWidth={false} disabled={submitted}>
                            Send Email
                        </Button>
                    </form>
                </>
            )}
        </Paper>
    );
}

export default LoginScreen;
