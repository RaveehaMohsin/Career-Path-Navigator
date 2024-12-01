import React from "react";
import Upperheader from "../../UpperHeader/upperheader";
import Calender from "./calender";

export default function AdminMeetingsView() {
  const userData = JSON.parse(localStorage.getItem("CareerPathNavigatorUsers"));
  const username = userData.user.firstName + " " + userData.user.lastName;
  return (
    <div>
      <Upperheader title="View Meetings" name={username} />
      <Calender />
    </div>
  );
}
