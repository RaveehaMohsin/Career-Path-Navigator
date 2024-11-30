import React from "react";
import Navbar1 from "../Navbar/navbar";
import { Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";

import DashboardConsellor from "../SideDashboard/dashboardcounsellor";
import StudentViewCounsellor from "./Student View/studentviewcounsellor";
import CounsellorMeetings from "./Counsellor Meetings/counsellormeet";
<<<<<<< HEAD
import CounsellorProfileView from "./Profile View/counsellorprofileView";

=======
import Studentadd from "../Student/Student Add/studentadd";
import StudentView from "../Student/Student View/studentView";
import ScheduleManagement from "./Schedule Management/ScheduleManagement";
>>>>>>> 272bf2f6def0119ab0d16c835e77b817933ef177


export default function CounsellorMain() {
    const userData = JSON.parse(localStorage.getItem('CareerPathNavigatorUsers'));
    const userRole = userData?.user?.role;
  
    if (!userData || userRole !== 'Counsellor') {
      return <Redirect to="/page-not-found" />;
    }
    
    return (
      <div>
        <div className="navbar">
          <Navbar1 />
        </div>
        <div style={{ display: "flex" }}>
          <DashboardConsellor />
          <div className="main-content">
            <Switch>
              <Route exact path="/counsellor/profileadd" component={Studentadd} />
              <Route exact path="/counsellor/profileview" component={StudentView} />
              <Route exact path="/counsellor/expertise" component={ScheduleManagement} />
              <Route exact path="/counsellor/studentview" component={StudentViewCounsellor} />
              <Route exact path="/counsellor/meetview" component={CounsellorMeetings} />
              <Route exact path="/counsellor/profileview" component={CounsellorProfileView} />
              
  
            </Switch>
          </div>
        </div>
      </div>
    );
  }