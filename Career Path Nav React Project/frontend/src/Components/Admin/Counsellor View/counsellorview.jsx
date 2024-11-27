import React from "react";
import Upperheader from "../../UpperHeader/upperheader";
import C1 from "../../../Assets/C1.jpg";
import C2 from "../../../Assets/C2.jpg";
import C3 from "../../../Assets/C3.jpg";
import C4 from "../../../Assets/C4.jpg";
import C5 from "../../../Assets/C5.jpg";
import C6 from "../../../Assets/C6.jpg";
import C7 from "../../../Assets/C7.jpg";
import C8 from "../../../Assets/C8.jpg";
import Card from "./card";

const CounsellorView = () => {
  return (
    <div>
      <Upperheader title="View Counsellors" />

      <div className="card-grid">
        <Card
          pic={C1}
          heading="John Doe"
          paragraph="Career Counsellor"
          label1="Male"
          label2="Business"
          label3="10 years of Experience"
        />
        <Card
          pic={C2}
          heading="Jane Smith"
          paragraph="Education Specialist"
          label1="Female"
          label2="Science"
          label3="5 years of Experience"
        />
        <Card
          pic={C3}
          heading="Alice Johnson"
          paragraph="Health Advisor"
          label1="Female"
          label2="Health"
          label3="7 years of Experience"
        />
        <Card
          pic={C4}
          heading="David Lee"
          paragraph="Technology Expert"
          label1="Male"
          label2="Tech"
          label3="12 years of Experience"
        />

        <Card
          pic={C5}
          heading="John Doe"
          paragraph="Career Counsellor"
          label1="Male"
          label2="Business"
          label3="10 years of Experience"
        />
        <Card
          pic={C6}
          heading="Jane Smith"
          paragraph="Education Specialist"
          label1="Female"
          label2="Science"
          label3="5 years of Experience"
        />
        <Card
          pic={C7}
          heading="Alice Johnson"
          paragraph="Health Advisor"
          label1="Female"
          label2="Health"
          label3="7 years of Experience"
        />
        <Card
          pic={C8}
          heading="David Lee"
          paragraph="Technology Expert"
          label1="Male"
          label2="Tech"
          label3="12 years of Experience"
        />
        <Card
          pic={C1}
          heading="John Doe"
          paragraph="Career Counsellor"
          label1="Male"
          label2="Business"
          label3="10 years of Experience"
        />
        <Card
          pic={C2}
          heading="Jane Smith"
          paragraph="Education Specialist"
          label1="Female"
          label2="Science"
          label3="5 years of Experience"
        />
        <Card
          pic={C3}
          heading="Alice Johnson"
          paragraph="Health Advisor"
          label1="Female"
          label2="Health"
          label3="7 years of Experience"
        />
        <Card
          pic={C4}
          heading="David Lee"
          paragraph="Technology Expert"
          label1="Male"
          label2="Tech"
          label3="12 years of Experience"
        />

        <Card
          pic={C5}
          heading="John Doe"
          paragraph="Career Counsellor"
          label1="Male"
          label2="Business"
          label3="10 years of Experience"
        />
        <Card
          pic={C6}
          heading="Jane Smith"
          paragraph="Education Specialist"
          label1="Female"
          label2="Science"
          label3="5 years of Experience"
        />
        <Card
          pic={C7}
          heading="Alice Johnson"
          paragraph="Health Advisor"
          label1="Female"
          label2="Health"
          label3="7 years of Experience"
        />
        <Card
          pic={C8}
          heading="David Lee"
          paragraph="Technology Expert"
          label1="Male"
          label2="Tech"
          label3="12 years of Experience"
        />
      </div>
    </div>
  );
};

export default CounsellorView;
