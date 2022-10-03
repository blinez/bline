import {fbBline} from '../firebase/firebase';
import {getEnv} from '../core/env/envService';
import {getAuth, signOut, signInWithEmailLink, sendSignInLinkToEmail} from 'firebase/auth';

async function emailLogin(email: string, emailLink: string): Promise<void> {
    await signInWithEmailLink(getAuth(fbBline), email, emailLink);
    localStorage.removeItem('emailForSignIn');
    return;
}

async function sendEmailLink(email: string): Promise<void> {
    const env = getEnv();
    const actionCodeSettings = {
        url: `${env.baseUrl}/finishSignUp`,
        handleCodeInApp: true,
    };

    console.log('sending email');
    await sendSignInLinkToEmail(getAuth(fbBline), email, actionCodeSettings);
    localStorage.setItem('emailForSignIn', email);
    console.log('success');

    return Promise.resolve();
}

function logout(): Promise<void> {
    return signOut(getAuth(fbBline));
}

export {emailLogin, logout, sendEmailLink};
