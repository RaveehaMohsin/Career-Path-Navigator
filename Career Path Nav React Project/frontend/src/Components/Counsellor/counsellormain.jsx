import React from "react";
import Navbar1 from "../Navbar/navbar";
import { Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";

import DashboardConsellor from "../SideDashboard/dashboardcounsellor";
import StudentViewCounsellor from "./Student View/studentviewcounsellor";

import CounsellorProfileView from "./Profile View/counsellorprofileView";

import Studentadd from "../Student/Student Add/studentadd";
import ScheduleManagement from "./Schedule Management/ScheduleManagement";
import StudentView from "../Student/Student View/studentView";
import StudentDetailMeetList from "../Admin/Student View/studentdetailmeetlist";
import CounsellorMeetings from "./Counsellor Meetings/counsellormeet";
import CounsellorInvoiceView from "./Invoice/invoiceviewcounsellor";
import CounsellorNoifications from "./Notifications/notificatinscounsellor";
import CounsellorViewStudentReviews from "./View Student Reviews/viewstudentreviewsCounsellor";
import CounsellorGiveReviewStudent from "./Give Reviews/givereviewstudentcounsellor";
import CounsellorGiveReviewSystem from "./Give Reviews/givereviewsystemcounsellor";

import DashboradCounsellorView from "./Dashboard/dashboardcounsellorview";


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
            <Route exact path="/counsellor/dashboard" component={DashboradCounsellorView} />
              <Route exact path="/counsellor/profileadd" component={Studentadd} />
              <Route exact path="/counsellor/profileview" component={CounsellorProfileView} />
              <Route exact path="/counsellor/expertise" component={ScheduleManagement} />
              <Route exact path="/counsellor/studentview" component={StudentViewCounsellor} />
              <Route exact path="/counsellor/studentsview/studentpersonprofile/:userId" component={StudentView} />
              <Route exact path="/counsellor/studentsview/studentdetailmeet/:userId" component={StudentDetailMeetList} />
              <Route exact path="/counsellor/meetview" component={CounsellorMeetings} />
              <Route exact path="/counsellor/invoiceview" component={CounsellorInvoiceView} />
              <Route exact path="/counsellor/notifications" component={CounsellorNoifications} />
              <Route exact path="/counsellor/viewstudentreviews" component={CounsellorViewStudentReviews} />
              <Route exact path="/counsellor/givestudentreview" component={CounsellorGiveReviewStudent} />
              <Route exact path="/counsellor/givesystemreview" component={CounsellorGiveReviewSystem} /> 
            </Switch>
          </div>
        </div>
      </div>
    );
  }