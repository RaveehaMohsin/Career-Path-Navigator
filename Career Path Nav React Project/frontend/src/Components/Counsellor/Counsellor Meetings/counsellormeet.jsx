import React from "react";
import Upperheader from "../../UpperHeader/upperheader";
import Calender from "../../Admin/Meetings View/calender";

export default function CounsellorMeetings() {
  return (
    <div>
      <Upperheader title="View Meetings" />
      <Calender />
    </div>
  );
}
