import React from 'react'
import { Signin } from './Signin'
import firebase from 'firebase'
import { Todo } from './Todo'


export const Main = () => {
    return (
        <div className="main">
            <h2>Welcome to the World</h2>
  
            {firebase.auth().currentUser ? <Todo /> : <div><Signin /></div>}
        </div>
    )
}
