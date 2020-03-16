import {TextField} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useAuthenticatedUser} from '../../auth/UserContext';
import {useHistory} from 'react-router-dom';

function AccountSettingsScreen() {
    const user = useAuthenticatedUser();
    const history = useHistory();

    const [value, setValue] = useState<string>(user.displayName ? user.displayName : '');
    const updateValue = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        user.updateProfile({displayName: value});
        history.push('/');
    };

    return (
        <>
            <h1>Settings</h1>
            <form onSubmit={submit}>
                <TextField label="username" onChange={updateValue} type="text" value={value} />
                <Button type="submit" variant="contained" fullWidth={false}>
                    set Username
                </Button>
            </form>
        </>
    );
}

export default AccountSettingsScreen;
