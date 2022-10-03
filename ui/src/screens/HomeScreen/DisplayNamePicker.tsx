import {TextField} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useAuthenticatedUser} from '../../auth/UserContext';
import {updateProfile} from 'firebase/auth';

export function DisplayNamePicker(): JSX.Element {
    const user = useAuthenticatedUser();

    const [value, setValue] = useState<string>('');
    const updateValue = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        updateProfile(user, {displayName: value});
    };

    return (
        <>
            <h1>Hi, please choose a username:</h1>
            <form onSubmit={submit}>
                <TextField label="username" onChange={updateValue} type="text" value={value} />
                <Button type="submit" variant="contained" fullWidth={false}>
                    set Username
                </Button>
            </form>
        </>
    );
}
