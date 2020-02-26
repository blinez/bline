import Button from '@material-ui/core/Button';
import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useAuth} from '../../auth/AuthContext';
import {useAuthenticatedUser} from '../../auth/UserContext';
import {TextField} from "@material-ui/core";

function HomeScreen() {
    const auth = useAuth();
    const user = useAuthenticatedUser();

    const [value, setValue] = useState<string>("");
    const updateValue = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        user.updateProfile({displayName: value});

    };

    function clickHandler() {
        auth.logout();
    }

    return (
        <>
            <h1>You are now logged in, {user.email}, {user.displayName}.</h1>
            <Button onClick={clickHandler} variant="contained" fullWidth={false}>
                Sign Out
            </Button>
            <form onSubmit={submit}>
                <TextField label="username"
                           onChange={updateValue}
                           type="text"
                           value={value}/>
                <Button type="submit" variant="contained" fullWidth={false}>
                    set Username
                </Button>
            </form>

        </>
    );
}

export default HomeScreen;
