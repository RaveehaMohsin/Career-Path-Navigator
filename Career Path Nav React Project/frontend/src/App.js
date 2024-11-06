import './App.css'
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import auth from './Components/auth/auth';
import StudentMain from './Components/Student/studentmain';
import KeyboardScroll from './Components/keyboardscroll'; // Import the new component


function App() {
  return (
    <div className="App">
      <KeyboardScroll /> 
      <Switch>
        <Route exact path="/studentprofile/studentadd" component={StudentMain} />
        <Route exact path="/auth" component={auth} />
      </Switch>
    </div>
  );
}

export default App;
