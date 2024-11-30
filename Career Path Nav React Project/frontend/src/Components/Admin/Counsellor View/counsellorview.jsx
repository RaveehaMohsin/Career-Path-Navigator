import React from "react";
import Upperheader from "../../UpperHeader/upperheader";
import C1 from "../../../Assets/C1.jpg";
import Card from "./card";

const CounsellorView = () => {
  return (
    <div>
      <Upperheader title="View Counsellors" />

      <div className="counsellor-card-grid">
        <Card
          pic={C1}
          heading="John Doe"
          paragraph="Career Counsellor"
          label1="Male"
          label2="Business"
          label3="10 years of Experience"
        />
      </div>
    </div>
  );
};

export default CounsellorView;
