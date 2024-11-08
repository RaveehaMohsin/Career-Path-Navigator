import React from 'react';
import Navbar1 from '../Navbar/navbar';
import Dashboard from '../SideDashboard/dashboard';
import Studentadd from './Student Add/studentadd';
import { Route, Switch } from 'react-router-dom';
import StudentInterestAdd from './Student Interest Details/StudentInterestAdd';

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
          </Switch>
        </div>
      </div>
    </div>
  );
}
