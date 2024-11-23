import React from "react";
import Navbar1 from "../Navbar/navbar";
import { Route, Switch } from "react-router-dom";

import Counsellorview from "./Counsellor View/counsellorview";
import DashboardAdmin from "../SideDashboard/dashboardadmin";
import StudentView from "./Student View/studentview";
import MeetingView from "./Meetings View/meetingview";


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
          </Switch>
        </div>
      </div>
    </div>
  );
}