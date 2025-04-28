import Upperheader from "../../UpperHeader/upperheader";
import React, { useState, useEffect } from "react";
import Reviews from "./review";

const SystemReviews = () => {
  const [reviewsData, setReviewsData] = useState([]);
  const userData = JSON.parse(localStorage.getItem("CareerPathNavigatorUsers"));
  const username = userData.user.firstName + " " + userData.user.lastName;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const currentUrl = window.location.pathname; // Get the current URL
        let endpoint = "http://localhost:4000/reviews/counselors-to-students";

        const response = await fetch(endpoint);
        const data = await response.json();
        console.log(data)

        if (currentUrl === "/review/fromcounsellor") {
          const filteredData = data.filter(
            (review) => review.toUserId === userData.user.userId
          );
          setReviewsData(filteredData);
        } else {
          setReviewsData(data);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div>
      <Upperheader title="View Reviews" name={username} />
      <Reviews title="All reviews to Students" data={reviewsData} />
    </div>
  );
};

export default SystemReviews;
