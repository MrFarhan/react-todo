// eslint-disable-next-line
import * as firebase from './firebase.js'
import './App.css';
import { Todo } from './Components/Todo';



function App() {
  return (
    <div className="App">
      <h1>Todo App</h1>
      <Todo />
    </div>
  );
}

export default App;
