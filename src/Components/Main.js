import React from 'react'
import { Signin } from './Signin'
import firebase from 'firebase'
import { Todo } from './Todo'


export const Main = () => {
    return (
        <div>
            {firebase.auth().currentUser ? <Todo/> : <div><Signin/></div>}
        </div>
    )
}
