import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useAuth} from '../../auth/AuthContext';
import {makeStyles} from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(() => ({
    signInForm: {
        position: 'absolute',
        width: '100%',
        padding: '10px'
    },
    link: {
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

    const updateValue = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        setSubmitted(false);
    };

    const sendEmailLink = async (event: FormEvent<HTMLFormElement>) => {
        // do not reload page on form submit:
        event.preventDefault();

        await auth.sendEmailLink(email);
        setSubmitted(true);
    };

    return (
        <Paper className={classes.signInForm}>
            {submitted ? (
                <>
                    <p>We sent a sign-in link to {email}. Please check your inbox. </p>
                    <p>
                        No email in your inbox? <span className={classes.link}>Send again.</span>
                    </p>
                </>
            ) : (
                <>
                    <p>To sign in, provide an e-mail address, and we will send you a sign-in link.</p>
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
