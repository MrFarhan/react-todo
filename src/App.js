// eslint-disable-next-line
import * as firebase from './firebase.js'
import './App.css';
import { Todo } from './Components/Todo';
import { Signup } from './Components/Signup.js';
import { Signin } from './Components/Signin.js';
import { Main } from './Components/Main.js';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App() {
  return (

    <Router >
      <Switch>
        <Route path="/todo">
          <Todo />
        </Route>
        <Route path="/signin">
          <Signin />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </Router >

  );
}

export default App;
