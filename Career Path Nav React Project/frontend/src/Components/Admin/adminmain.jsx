import React from "react";
import Navbar1 from "../Navbar/navbar";
import { Route, Switch } from "react-router-dom";

import Counsellorview from "./Counsellor View/counsellorview";
import DashboardAdmin from "../SideDashboard/dashboardadmin";
import StudentView from "./Student View/studentview";
import MeetingView from "./Meetings View/meetingview";
import InvoiceView from "./Invoice View/invoiceview";
import StudentReviews from "./Reviews/studentreviews";
import CounsellorReviews from "./Reviews/counsellorreview";
import SystemReviews from "./Reviews/systemreview";
// import MeetingsTable from "./Meetings View/Detailed Meet/meetinglist";


export default function AdminMain() {
  return (
    <div>
      <div className="navbar">
        <Navbar1 />
      </div>
      <div style={{ display: "flex" }}>
        <DashboardAdmin />
        <div className="main-content">
          <Switch>
            <Route exact path="/admin/counsellorview" component={Counsellorview} />
            <Route exact path="/admin/studentview" component={StudentView} />
            <Route exact path="/admin/meetview" component={MeetingView} />
            {/* <Route exact path="/admin/meetview/detailmeet" component={MeetingsTable} /> */}

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