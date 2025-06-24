// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAw9cWwU7jnCLAKME6yrDYVaobpwn6IJuI",
    authDomain: "simple-firbase-da03a.firebaseapp.com",
    projectId: "simple-firbase-da03a",
    storageBucket: "simple-firbase-da03a.firebasestorage.app",
    messagingSenderId: "285462613604",
    appId: "1:285462613604:web:6b94cd676d16eeb0f35971",
    measurementId: "G-WGYQSP9N75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;