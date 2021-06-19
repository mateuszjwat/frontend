import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import PublicFiszki from './components/PublicFiszki';
import NavigationBar from './components/NavigationBar';
import MyFiszkas from './components/Fiszki/MyFiszkas';
import AddFiszka from './components/Fiszki/AddFiszka';
import FiszkaSite from './components/Fiszki/FiszkaSite';
import FiszkaLearn from './components/Fiszki/Learn';
import FiszkaTest from './components/Fiszki/Test';

import Login from './components/Login/Login';
import SignUp from './components/Login/SignUp';

import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from 'react';


function App() {
  
  const [user, setUser] = useState(null);
  const [fiszka, setFiszka] = useState(null);

  return (
    <div className="App">
      <Router>
        <NavigationBar user={user}/>
        <Route path="/login">
          <Login user={user} setUser={setUser}/>
        </Route>
        <Route path="/signUp">
          <SignUp user={user} setUser={setUser}/>
        </Route>
        <Route exact path="/">
          <Home user={user}/>
        </Route>
        <Route path="/PublicFiszki">
          <PublicFiszki setFiszka={setFiszka}/>
        </Route>
        <Route path="/myFiszkas">
          <MyFiszkas user={user} setUser={setUser} setFiszka={setFiszka}/>
        </Route>
        <Route path="/addFiszka">
          <AddFiszka user={user} setUser={setUser}/>
        </Route>
        <Route exact path="/fiszkaSite">
          <FiszkaSite fiszka={fiszka} setFiszka={setFiszka}/>
        </Route>
        <Route path="/fiszkaLearn">
          <FiszkaLearn fiszka={fiszka} setFiszka={setFiszka} />
        </Route>
        <Route path="/fiszkaTest">
          <FiszkaTest fiszka={fiszka} setFiszka={setFiszka} />
        </Route>
      </Router>
    </div>
  );
}

export default App;