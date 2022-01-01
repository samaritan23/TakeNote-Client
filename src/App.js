import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import './App.css';
import About from './components/About';
import Login from './components/Login';
import { MyNotes } from './components/MyNotes';
import {Navbar} from './components/Navbar';
import Signup from './components/Signup';
import NoteState from './context/notes/noteState';
import AuthState from "./context/auth/authState";
import { useState } from "react";
import Alert from "./components/Alerts";

function App() {
  const [alert, setAlert] = useState(null)
  const showAlert  = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null)
    }, 1500)
  }

  return (
    <div className="App">
      <AuthState showAlert={showAlert}>
        <NoteState showAlert={showAlert}>
          <Router>
            <Navbar/>
            <Alert alert={alert}/>
            <div className="container">
              <Switch>
                <Route exact path="/">
                  <MyNotes />
                </Route>
                <Route exact path="/about">
                  <About />
                </Route>
                <Route exact path="/signup">
                  <Signup />
                </Route>
                <Route exact path="/login">
                  <Login />
                </Route>
              </Switch>
            </div>
          </Router>
        </NoteState>
      </AuthState>
    </div>
  );
}

export default App;
