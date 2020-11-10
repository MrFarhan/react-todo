import React, { useState } from 'react'
import firebase from 'firebase'

export const Signup = () => {
    const [uName, setuName] = useState()
    const [uEmail, setuEmail] = useState()
    const [uPassword, setuPassword] = useState()
    const [confirmPassword, setconfirmPassword] = useState()


    const Logon = () => {

        if (uEmail.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (uPassword.length < 4) {
            alert('Please enter a password.');
            return;
        }
        if (uPassword !== confirmPassword){
            alert("password and confirm password mismatched")
            return;
        }
        
        firebase.auth().createUserWithEmailAndPassword(uEmail, uPassword).then((res) => {
            let UID = firebase.auth().currentUser?.uid
            console.log(res, "signup res")
            firebase.database().ref('Users/' + UID).set({
                userName: uName
            })

        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, "error code" + errorMessage, "error message")
            // ...
        });



    }

    return (
        <div>
            <input type="text" placeholder="User Name" onChange={(e) => setuName(e.target.value)} /><br />
            <input type="text" placeholder="Email" onChange={(e) => setuEmail(e.target.value)} /><br />
            <input type="password" placeholder="Set Pawword" onChange={(e) => setuPassword(e.target.value)} /><br />
            <input type="password" placeholder="Confirm Pawword" onChange={(e) => setconfirmPassword(e.target.value)} />
            <br />
            <button>Sign In</button> &nbsp;
            <button onClick={Logon} >Sign Up</button>
        </div>
    )
}
