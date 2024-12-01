import React from "react";
import Upperheader from "../../UpperHeader/upperheader";
import Reviews from "../../Admin/Reviews/review";

const CounsellorViewStudentReviews = () =>{
    const reviewsData = [];

return(
    <div>
         <Upperheader title="View Reviews" />
         <Reviews title="All reviews to system" data={reviewsData} />
    </div>
)
};
export default CounsellorViewStudentReviews;