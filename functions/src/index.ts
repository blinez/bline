import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {UserRecord} from "firebase-functions/lib/providers/auth";

admin.initializeApp();
const db = admin.firestore();

export const helloWorld = functions.https.onRequest((request, response) => {
    response.send('Hello from Firebase!');
});

export const createUserProfile = functions.auth.user().onCreate((userRecord: UserRecord) => {
    const {email, uid} = userRecord;

    return db
        .collection('users')
        .doc(uid)
        .set({
            uid,
            email,
            displayName: null
        })
        .catch(console.error);
});
