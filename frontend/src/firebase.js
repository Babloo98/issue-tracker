import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyD1lCdeF7aK4GkrFlU3UfFqdxuhMC6LqOs",
    authDomain: "archsystem-84739.firebaseapp.com",
    databaseURL: "https://archsystem-84739.firebaseio.com",
    projectId: "archsystem-84739",
    storageBucket: "archsystem-84739.appspot.com",
    messagingSenderId: "463763413185",
    appId: "1:463763413185:web:8302aa863f40741863dc40",
    measurementId: "G-CRQM4W7EQC"
};
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  export default firebaseApp;