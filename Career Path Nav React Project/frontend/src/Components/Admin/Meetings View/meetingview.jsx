import React from "react";
import Upperheader from "../../UpperHeader/upperheader";
import Calender from "./calender";

export default function AdminMain() {
  return (
    <div>
      <Upperheader title="View Meetings" />
      <Calender />
    </div>
  );
}
