import React from "react";
import Navbar1 from "../../Navbar/navbar";
import Dashboard from "../../SideDashboard/dashboard";

export default function studentadd() {
  return (
    <div>
      {/* <Navbar1 /> */}
      <div style={{marginTop:"4%"}}>
      <Dashboard />
      <div className="main-content" style={{ padding: "20px" }}>
        <h1>Welcome to the Career Path Navigator</h1>
        <p>Your dashboard is now responsive!</p>
      </div>
    </div>
    </div>
  );
}
