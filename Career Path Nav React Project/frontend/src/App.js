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
        {/* Auth Route */}
       <Route exact path="/auth" component={auth} />

         {/* Student Role Route */}
        <Route exact path="/studentprofile/studentadd" component={StudentMain} />
        <Route exact path="/studentprofile/interestsadd" component={StudentMain} />
        <Route exact path="/student/careerrecommendation" component={StudentMain} />
        <Route exact path="/studentprofile/studentview" component={StudentMain} />
        <Route exact path="/progresstracker/jobs" component={StudentMain} />

        {/* Counsellor Route */}

        {/* Admin Route */}
        
      </Switch>
    </div>
  );
}

export default App;
