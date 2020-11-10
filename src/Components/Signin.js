import React, { useState } from 'react'
import firebase from 'firebase'
import { useHistory } from 'react-router-dom'


export const Signin = () => {
    const [uEmail, setuEmail] = useState()
    const [uPassword, setuPassword] = useState()

    let history = useHistory();
    const Login = () => {


        firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            history.replace("/todo")
        
            // User is signed in.
            console.log("user is signed in")
        } else {
            // No user is signed in.
            history.replace("/signin")




            console.log("user is not signed in")

        }
    });
    
    firebase.auth().signInWithEmailAndPassword(uEmail, uPassword).then(() => {
        console.log(uEmail, "email", uPassword, "password")
        console.log(firebase.auth().currentUser)
        history.replace("/todo")

    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
    });


        if (uEmail?.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (uPassword?.length < 4) {
            alert('Please enter a password.');
            return;
        }
    }


    const signUp = () => {
        history.replace("/signup")
    }

    return (
        <div>
            <input type="text" placeholder="Email" onChange={(e) => setuEmail(e.target.value)} value={uEmail} /><br />
            <input type="password" placeholder="Pawword" onChange={(e) => setuPassword(e.target.value)} value={uPassword} /><br />
            <button onClick={Login} >Sign in</button>
            <button onClick={signUp} >Sign up</button>

        </div>
    )
}
