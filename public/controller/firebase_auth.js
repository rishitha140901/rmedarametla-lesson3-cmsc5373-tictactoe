import { 
    getAuth, signInWithEmailAndPassword,
    onAuthStateChanged, signOut,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { app } from "./firebase_core.js";
import { DEV } from "../model/constants.js";

const auth = getAuth(app);

export async function signinFirebase(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
      //  const user = userCredential.user;
    } catch (error) {
        if (DEV) console.log('signin error:',error);
        const errorCode = error.code;
        const errorMessage = error.message;
        alert('signin error:' + errorCode + ' ' + errorMessage);
    }
}

export function attachAuthStateChangeObserver(){
    onAuthStateChanged(auth,authStateChangeListener);

}

function authStateChangeListener(user){
    if(user){
        console.log('user: ', user.email);
    }else{
        console.log('signed out');
    }
}

export async function signOutFirebase() {
   await signOut(auth);

}