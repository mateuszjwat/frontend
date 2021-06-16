import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Contact from './components/Contact';
import About from './components/About';
import Home from './components/Home';
import Login from './components/Login';
import PublicFiszki from './components/PublicFiszki';
import NavigationBar from './components/NavigationBar';
import FiszkaSet from './components/FiszkaSet';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from 'react';

const initialUser = {
  loggedIn: false,
  username: null,
  token: null,
}


function App() {
  
  const [user, setUser] = useState(initialUser);

  return (
    <div className="App">
      <Router>
        <NavigationBar user={user}/>
        <Route exact path="/">
          <Home user={user}/>
        </Route>
        <Route path="/PublicFiszki">
          <PublicFiszki/>
        </Route>
        <Route path="/about" component={About}></Route>
        <Route exact path="/contact">
          <Contact/>
        </Route>
        <Route path="/login">
          <Login user={user} setUser={setUser}/>
        </Route>
        <Route path="/fiszkaSet/:id">
          <FiszkaSet/>
        </Route>
        <Route exact path="/fiszkaSet">
          <FiszkaSet/>
        </Route>
      </Router>
    </div>
  );
}

export default App;