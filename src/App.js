import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Contact from './components/Contact';
import About from './components/About';
import Home from './components/Home';
import Login from './components/Login'
import NavigationBar from './components/NavigationBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

const initialUser = {
  loggedIn: false,
  username: null,
  token: null,
}


function App() {
  
  const [user, setUser] = useState(initialUser);

  console.log(user);

  return (
    <div className="App">
      <Router>
        <NavigationBar user={user}/>
        <Route exact path="/">
          <Home user={user}/>
        </Route>
        <Route path="/about" component={About}></Route>
        <Route exact path="/contact">
          <Contact/>
        </Route>
        <Route path="/login">
          <Login user={user} setUser={setUser}/>
        </Route>
      </Router>
    </div>
  );
}

export default App;