import firebase from 'firebase'

var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
    apiKey: "AIzaSyC7TpMnzkuvXmV0hR-G5zMrJRpVFcB0ZsQ",
    authDomain: "quickness-app.firebaseapp.com",
    databaseURL: "https://quickness-app.firebaseio.com",
    projectId: "quickness-app",
    storageBucket: "quickness-app.appspot.com",
    messagingSenderId: "318425893840"
};
var fire = firebase.initializeApp(config);
export default fire;