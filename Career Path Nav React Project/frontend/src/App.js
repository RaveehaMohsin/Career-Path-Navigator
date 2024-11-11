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
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
        <Route exact path="/auth" component={auth} />
        <Route exact path="/studentprofile/studentadd" component={StudentMain} />
        <Route exact path="/studentprofile/studentinterestadd" component={StudentMain} />
        <Route exact path="/studentprofile/studentview" component={StudentMain} />
=======
>>>>>>> Stashed changes
        {/* Auth Route */}
       <Route exact path="/auth" component={auth} />

         {/* Student Role Route */}
        <Route exact path="/studentprofile/studentadd" component={StudentMain} />
        <Route exact path="/studentprofile/interestsadd" component={StudentMain} />
        <Route exact path="/student/careerrecommendation" component={StudentMain} />

        {/* Counsellor Route */}

        {/* Admin Route */}
<<<<<<< Updated upstream
=======
>>>>>>> 50a7a6ef08c19ab69c42c85317bbb2502fe9b97c
>>>>>>> Stashed changes
        
      </Switch>
    </div>
  );
}

export default App;
