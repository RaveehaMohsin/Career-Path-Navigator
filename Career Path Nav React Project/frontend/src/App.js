import './App.css';
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'; // Import Redirect
import auth from './Components/auth/auth';
import StudentMain from './Components/Student/studentmain';
import KeyboardScroll from './Components/keyboardscroll'; // Import the new component
import PageNotFound from './Components/PageNotFound/Pagenotfound';
import AdminMain from './Components/Admin/adminmain';

function App() {
  return (
    <div className="App">
      <KeyboardScroll />
      <Switch>
        {/* Redirect to /auth when the base URL is accessed */}
        <Route exact path="/">
          <Redirect to="/auth" />
        </Route>

        {/* Auth Route */}
        <Route exact path="/auth" component={auth} />

        {/* Student Role Routes */}
        <Route exact path="/studentprofile/studentadd" component={StudentMain} />
        <Route exact path="/studentprofile/interestsadd" component={StudentMain} />
        <Route exact path="/student/careerrecommendation" component={StudentMain} />
        <Route exact path="/studentprofile/studentview" component={StudentMain} />
        <Route exact path="/progresstracker/jobs" component={StudentMain} />
        <Route exact path="/progresstracker/courses" component={StudentMain} />
        <Route exact path="/progresstracker/degrees" component={StudentMain} />
        <Route exact path="/student/chatbot" component={StudentMain} />

        {/* Counsellor Route */}

        {/* Admin Route */}
        <Route exact path="/admin/counsellorview" component={AdminMain} />
        <Route exact path="/admin/studentview" component={AdminMain} />
        <Route exact path="/admin/meetview"  component={AdminMain} />
        {/* <Route exact path="/admin/meetview/detailmeet" component={AdminMain} /> */}

        <Route exact path="/admin/invoiceview"  component={AdminMain} />
        <Route exact path="/admin/studentreview"  component={AdminMain} />
        <Route exact path="/admin/counsellorreview"  component={AdminMain} />
        <Route exact path="/admin/systemreview"  component={AdminMain} />

        {/* Default */}
        {/* Catch-All Route for Undefined Paths */}
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
