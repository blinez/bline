import {fbBline} from '../firebase/firebase';
import {getEnv} from '../core/env/envService';

async function emailLogin(email: string, emailLink: string): Promise<void> {
    await fbBline.auth().signInWithEmailLink(email, emailLink);
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
    await fbBline.auth().sendSignInLinkToEmail(email, actionCodeSettings);
    localStorage.setItem('emailForSignIn', email);
    console.log('success');

    return Promise.resolve();
}

function logout(): Promise<void> {
    return fbBline.auth().signOut();
}

export {emailLogin, logout, sendEmailLink};
