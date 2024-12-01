import React from "react";
import Navbar1 from "../Navbar/navbar";
import { Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";

import DashboardAdmin from "../SideDashboard/dashboardadmin";
import Counsellorview from "./Counsellor View/counsellorview";
import StudentView from "../Student/Student View/studentView";
import MeetingView from "./Meetings View/meetingview";
import InvoiceView from "./Invoice View/invoiceview";
import StudentReviews from "./Reviews/studentreviews";
import CounsellorReviews from "./Reviews/counsellorreview";
import SystemReviews from "./Reviews/systemreview";
import Studentadd from "../Student/Student Add/studentadd";
import StudentViewAdmin from './Student View/studentview';


import CounsellorDetailMeetList from "./Counsellor View/counsellordetailmeetlist";
import StudentDetailMeetList from "./Student View/studentdetailmeetlist";
import AdminProfileView from "./Profile View Admin/profileviewadmin";
import DashboradAdminView from "./Dashboard/dashboardadminview";
import CounsellorProfileView from "../Counsellor/Profile View/counsellorprofileView";

export default function AdminMain() {
  const userData = JSON.parse(localStorage.getItem('CareerPathNavigatorUsers'));
  const userRole = userData?.user?.role;

  if (!userData || userRole !== 'Admin') {
    return <Redirect to="/page-not-found" />;
  }
  
  return (
    <div>
      <div className="navbar">
        <Navbar1 />
      </div>
      <div style={{ display: "flex" }}>
        <DashboardAdmin />
        <div className="main-content">
          <Switch>
          <Route exact path="/admin/dashboard" component={DashboradAdminView} />

            <Route exact path="/admin/profileadd" component={Studentadd} />
            <Route exact path="/admin/profileview" component={AdminProfileView} />


            <Route exact path="/admin/counsellorview" component={Counsellorview} />
            <Route exact path="/admin/studentview" component={StudentViewAdmin} />
            <Route exact path="/admin/meetview" component={MeetingView} />

            <Route exact path="/admin/meetview/counsellordetailmeet" component={CounsellorDetailMeetList} />
            <Route exact path="/admin/studentsview/studentpersonprofile/:userId" component={StudentView} />
            <Route exact path="/admin/counsellorview/counsellorpersonprofile/:mycounsellorId" component={CounsellorProfileView} />
            <Route exact path="/admin/studentsview/studentdetailmeet/:userId" component={StudentDetailMeetList} />
            <Route exact path="/admin/counsellorview/counsellordetailmeet/:mycounsellorId" component={CounsellorDetailMeetList} />

            <Route exact path="/admin/invoiceview" component={InvoiceView} />
            <Route exact path="/admin/counsellorreview" component={CounsellorReviews} />
            <Route exact path="/admin/studentreview" component={StudentReviews} />
            <Route exact path="/admin/systemreview" component={SystemReviews} />

          </Switch>
        </div>
      </div>
    </div>
  );
}