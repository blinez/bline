import * as firebase from 'firebase/app';
import 'firebase/functions';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

export const fbBline: firebase.app.App =
    firebase.apps.length === 0
        ? firebase.initializeApp({
            apiKey: "AIzaSyCD3PO2Z7luNqKIrkvbUciofuwVdjESTxk",
            authDomain: "bline-8bac2.firebaseapp.com",
            databaseURL: "https://bline-8bac2.firebaseio.com",
            projectId: "bline-8bac2",
            storageBucket: "bline-8bac2.appspot.com",
            messagingSenderId: "1070002645087",
            appId: "1:1070002645087:web:cb571f0563c801670f13ea"
        })
        : firebase.apps[0];