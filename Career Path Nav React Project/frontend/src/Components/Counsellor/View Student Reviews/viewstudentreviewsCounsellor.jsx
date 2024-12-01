import React, { useEffect, useState } from "react";
import Upperheader from "../../UpperHeader/upperheader";
import Reviews from "../../Admin/Reviews/review";

const CounsellorViewStudentReviews = () =>{
    const [reviewsData, setReviewsData] = useState([]);
    const userData = JSON.parse(localStorage.getItem("CareerPathNavigatorUsers"));
    const username = userData.user.firstName + " " + userData.user.lastName;
    const userId = userData.user.userId;
    
  
    useEffect(() => {
        const fetchReviews = async () => {
          try {
            const response = await fetch("http://localhost:4000/reviews/students-to-counselors");
            const data = await response.json();
            
            // Filter reviews where the 'toUserId' matches the current user's id
            const filteredReviews = data.filter(review => review.toUserId === userId);
            
            setReviewsData(filteredReviews);
          } catch (error) {
            console.error("Error fetching reviews:", error);
          }
        };
    
        fetchReviews();
      }, [userId]);

return(
    <div>
         <Upperheader title="View Reviews" name={username} />
         <Reviews title="Student reviews for You" data={reviewsData} />
    </div>
)
};
export default CounsellorViewStudentReviews;