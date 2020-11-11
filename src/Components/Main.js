import React from 'react'
import firebase from 'firebase'
import { Todo } from './Todo'
import { Redirect } from 'react-router-dom'


export const Main = () => {

    return (
        <div className="main">
            {firebase.auth().currentUser ? <Todo /> : <Redirect to="/signin" />}
        </div>
    )
}
