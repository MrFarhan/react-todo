import React, { useState } from 'react'
import firebase from 'firebase'
import { Redirect, useHistory } from 'react-router-dom'
import { Form, Spinner, Button } from 'react-bootstrap'


export const Signin = () => {
    const [uEmail, setuEmail] = useState()
    const [uPassword, setuPassword] = useState()
    const [loading, setLoading] = useState(false)


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
            setLoading(true)
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

    if((firebase.auth().currentUser))
    return <Redirect to="/todo" />
    return (
        (loading ? <Spinner animation="border" /> : <div className="signinComp">
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => setuEmail(e.target.value)} value={uEmail} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => setuPassword(e.target.value)} value={uPassword} />
                </Form.Group>

                <Button variant="primary" onClick={Login}>Sign in</Button> &nbsp;
                <Button variant="primary" onClick={signUp}>Sign up</Button>

            </Form>
        </div>)


    )
}
