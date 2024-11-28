import React from "react";
import Navbar1 from "../Navbar/navbar";
import { Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";

import DashboardConsellor from "../SideDashboard/dashboardcounsellor";
import StudentViewCounsellor from "./Student View/studentviewcounsellor";
import CounsellorMeetings from "./Counsellor Meetings/counsellormeet";



export default function CounsellorMain() {
    // const userData = JSON.parse(localStorage.getItem('CareerPathNavigatorUsers'));
    // const userRole = userData?.user?.role;
  
    // if (!userData || userRole !== 'Counsellor') {
    //   return <Redirect to="/page-not-found" />;
    // }
    
    return (
      <div>
        <div className="navbar">
          <Navbar1 />
        </div>
        <div style={{ display: "flex" }}>
          <DashboardConsellor />
          <div className="main-content">
            <Switch>
              <Route exact path="/counsellor/studentview" component={StudentViewCounsellor} />
              <Route exact path="/counsellor/meetview" component={CounsellorMeetings} />
              
  
            </Switch>
          </div>
        </div>
      </div>
    );
  }