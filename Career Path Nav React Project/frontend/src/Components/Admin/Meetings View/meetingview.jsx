import React from "react";
import "./meetingview.css";
import Upperheader from "../../UpperHeader/upperheader";
import Calender from "./calender";

export default function AdminMain() {
    return (
      <div>
       <Upperheader title="View Meetings" />

       <div>
        <Calender />
        
        </div>     

      </div>
    );
  }