import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBh6kaoWauWRVvOsLT4aTeXbpEFeQCKEC8",
    authDomain: "anxiety-extension.firebaseapp.com",
    databaseURL: "https://anxiety-extension.firebaseio.com",
    projectId: "anxiety-extension",
    storageBucket: "anxiety-extension.appspot.com",
    messagingSenderId: "492187746477"
};
firebase.initializeApp(config);
export default firebase;