import './App.css';
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'; 
import auth from './Components/auth/auth';
import StudentMain from './Components/Student/studentmain';
import KeyboardScroll from './Components/keyboardscroll'; 
import PageNotFound from './Components/PageNotFound/Pagenotfound';
import AdminMain from './Components/Admin/adminmain';

import CounsellorMain from './Components/Counsellor/counsellormain';
import LandingPage from './Components/LandingPage/LandingPage';

function App() {
  return (
    <div className="App">
      <KeyboardScroll />
      <Switch>
        {/* Redirect to /landing when the base URL is accessed */}
        <Route exact path="/">
          <Redirect to="/careerpathnavigator" />
        </Route>


       {/* Landing Route */}
        <Route exact path="/careerpathnavigator"  component={LandingPage} />


        {/* Auth Route */}
        <Route exact path="/auth" component={auth} />

        {/* Student Role Routes */}
        <Route exact path="/student/dashboard" component={StudentMain} />
        <Route exact path="/studentprofile/studentadd" component={StudentMain} />
        <Route exact path="/studentprofile/interestsadd" component={StudentMain} />
        <Route exact path="/student/careerrecommendation" component={StudentMain} />
        <Route exact path="/studentprofile/studentview" component={StudentMain} />
        <Route exact path="/progresstracker/jobs" component={StudentMain} />
        <Route exact path="/progresstracker/courses" component={StudentMain} />
        <Route exact path="/progresstracker/degrees" component={StudentMain} />
        <Route exact path="/student/chatbot" component={StudentMain} />
        <Route exact path="/student/resume-builder" component={StudentMain} />
        <Route exact path="/review/system" component={StudentMain} />
        <Route exact path="/review/counsellor" component={StudentMain} />
        <Route exact path="/meetwithcounsellor/appointment" component={StudentMain} />
        <Route exact path="/meetwithcounsellor/notifications" component={StudentMain} />
        <Route exact path="/review/fromcounsellor" component={StudentMain} />

        {/* Counsellor Route */}
        <Route exact path="/counsellor/dashboard" component={CounsellorMain} />
        <Route exact path="/counsellor/profileadd" component={CounsellorMain} />
        <Route exact path="/counsellor/profileview" component={CounsellorMain} />
        <Route exact path="/counsellor/profileviewwithcard" component={CounsellorMain} />
        <Route exact path="/counsellor/expertise" component={CounsellorMain} />
        <Route exact path="/counsellor/studentview" component={CounsellorMain} />
        <Route exact path="/counsellor/meetview" component={CounsellorMain} />
        <Route exact path="/counsellor/studentsview/studentpersonprofile/:userId" component={CounsellorMain} />
        <Route exact path="/counsellor/studentsview/studentdetailmeet/:userId" component={CounsellorMain} />
        <Route exact path="/counsellor/invoiceview" component={CounsellorMain} />
        <Route exact path="/counsellor/notifications" component={CounsellorMain} />
        <Route exact path="/counsellor/viewstudentreviews" component={CounsellorMain} />
        <Route exact path="/counsellor/givestudentreview" component={CounsellorMain} />
        <Route exact path="/counsellor/givesystemreview" component={CounsellorMain} />



        {/* Admin Route */}
        <Route exact path="/admin/dashboard" component={AdminMain} />

        <Route exact path="/admin/profileadd" component={AdminMain} />
        <Route exact path="/admin/profileview" component={AdminMain} />
        <Route exact path="/admin/profileviewwithcard" component={AdminMain} />

        <Route exact path="/admin/counsellorview" component={AdminMain} />
        <Route exact path="/admin/studentview" component={AdminMain} />
        <Route exact path="/admin/meetview"  component={AdminMain} />
        <Route exact path="/admin/invoiceview"  component={AdminMain} />
        <Route exact path="/admin/studentreview"  component={AdminMain} />
        <Route exact path="/admin/counsellorreview"  component={AdminMain} />
        <Route exact path="/admin/systemreview"  component={AdminMain} />
        
        <Route exact path="/admin/meetview/counsellordetailmeet" component={AdminMain} />
        <Route exact path="/admin/studentsview/studentpersonprofile/:userId" component={AdminMain} />
        <Route exact path="/admin/studentsview/studentdetailmeet/:userId" component={AdminMain} />
        <Route exact path="/admin/counsellorview/counsellorpersonprofile/:mycounsellorId" component={AdminMain} />
        <Route exact path="/admin/counsellorview/counsellordetailmeet/:mycounsellorId" component={AdminMain} />
        
       
        {/* Default */}
        {/* Catch-All Route for Undefined Paths */}
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
