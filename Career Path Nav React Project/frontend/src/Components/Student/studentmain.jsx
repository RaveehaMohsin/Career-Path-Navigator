import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Navbar1 from '../Navbar/navbar';
import Dashboard from '../SideDashboard/dashboardstudent';

import Studentadd from './Student Add/studentadd';
import StudentInterestAdd from './Student Interest Details/StudentInterestAdd';
import Careerrecommendation from './Career Recommendation/careerrecommendation';
import StudentView from './Student View/studentView';
import Jobs from './Progress Tracker/Jobs/jobs';
import Degrees from './Progress Tracker/Degree/degrees';
import Courses from './Progress Tracker/Courses/courses';
import Chatbot from './Chatbot/chatbot';
import Resumebuilder from './Resume-Builder/Resumebuilder';
import Reviews from './Reviews/Reviews';
import Appointment from './Meet with Counsellor/Appointment/Appointment';
import DashboradStudentView from './Dashboard/dashboardstudentview';
import Notifications from './Meet with Counsellor/Notifications/Notifications';
import CounsellorReview from '../Admin/Reviews/studentreviews'


export default function StudentMain() {
  const userData = JSON.parse(localStorage.getItem('CareerPathNavigatorUsers'));
  const userRole = userData?.user?.role;

  if (!userData || userRole !== 'Student') {
    return <Redirect to="/page-not-found" />;
  }

  return (
    <div>
      <div className="navbar">
        <Navbar1 />
      </div>
      <div style={{ display: 'flex' }}>
        <Dashboard />
        <div className="main-content">
          <Switch>
          <Route exact path="/student/dashboard" component={DashboradStudentView} />
            <Route exact path="/studentprofile/studentadd" component={Studentadd} />
            <Route exact path="/studentprofile/interestsadd" component={StudentInterestAdd} />
            <Route exact path="/student/careerrecommendation" component={Careerrecommendation} />
            <Route exact path="/studentprofile/studentview" component={StudentView} />
            <Route exact path="/progresstracker/jobs" component={Jobs} />
            <Route exact path="/progresstracker/courses" component={Courses} />
            <Route exact path="/progresstracker/degrees" component={Degrees} />
            <Route exact path="/student/chatbot" component={Chatbot} />
            <Route exact path="/student/resume-builder" component={Resumebuilder} />
            <Route exact path="/review/system" component={Reviews} />
            <Route exact path="/review/counsellor" component={Reviews} />
            <Route exact path="/meetwithcounsellor/appointment" component={Appointment} />
            <Route exact path="/meetwithcounsellor/notifications" component={Notifications} />
            <Route exact path="/review/fromcounsellor" component={CounsellorReview} />
          </Switch>
        </div>
      </div>
    </div>
  );
}
