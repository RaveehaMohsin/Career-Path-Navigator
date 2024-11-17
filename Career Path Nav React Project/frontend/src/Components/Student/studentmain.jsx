import React from 'react';
import Navbar1 from '../Navbar/navbar';
import Dashboard from '../SideDashboard/dashboard';
import { Route, Switch } from 'react-router-dom';

import Studentadd from './Student Add/studentadd';
import StudentInterestAdd from './Student Interest Details/StudentInterestAdd';
import Careerrecommendation from './Career Recommendation/careerrecommendation';
import StudentView from './Student View/studentView'
import Jobs from './Progress Tracker/Jobs/jobs';
import Degrees from './Progress Tracker/Degree/degrees';
import Courses from './Progress Tracker/Courses/courses';


export default function StudentMain() {
  return (
    <div>
      <div className="navbar">
        <Navbar1 />
      </div>
      <div style={{ display: "flex" }}> 
        <Dashboard />
        <div className="main-content">
          <Switch>
            <Route exact path='/studentprofile/studentadd' component={Studentadd} />
            <Route exact path='/studentprofile/interestsadd' component={StudentInterestAdd} />
            <Route exact path='/student/careerrecommendation' component={Careerrecommendation} />
            <Route exact path='/studentprofile/studentview' component={StudentView} />
            <Route exact path="/progresstracker/jobs" component={Jobs} />
            <Route exact path="/progresstracker/courses" component={Courses} />
            <Route exact path="/progresstracker/degrees" component={Degrees} />
          </Switch>
        </div>
      </div>
    </div>
  );
}
