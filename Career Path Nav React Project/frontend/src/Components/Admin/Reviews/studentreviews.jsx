import Upperheader from "../../UpperHeader/upperheader";
import React, { useState } from "react";
import Reviews from "./review";;




const StudentReviews = () => {
    const reviewsData = [
        {
          id: 1,
          rating: 5,
          comments: "Excellent service!",
          submissionDate: "2024-11-20",
        },
        {
          id: 2,
          rating: 4,
          comments: "Very good, but can improve!",
          submissionDate: "2024-11-18",
        },
        {
          id: 3,
          rating: 3,
          comments: "Average experience.",
          submissionDate: "2024-11-15",
        },
        {
          id: 4,
          rating: 2,
          comments: "Not satisfied with the service.",
          submissionDate: "2024-11-10",
        },
        {
          id: 5,
          rating: 5,
          comments: "Absolutely amazing! Highly recommended!",
          submissionDate: "2024-11-05",
        },
        {
          id: 6,
          rating: 4,
          comments: "Great experience overall!",
          submissionDate: "2024-11-01",
        },
        {
          id: 7,
          rating: 3,
          comments: "It was okay.",
          submissionDate: "2024-10-29",
        },
        {
          id: 8,
          rating: 1,
          comments: "Worst service ever.",
          submissionDate: "2024-10-25",
        },
        {
          id: 9,
          rating: 5,
          comments: "Perfect! Will come again.",
          submissionDate: "2024-10-20",
        },
        {
          id: 10,
          rating: 2,
          comments: "Needs improvement.",
          submissionDate: "2024-10-18",
        },
        {
          id: 11,
          rating: 4,
          comments: "Pretty good service.",
          submissionDate: "2024-10-15",
        },
        {
          id: 12,
          rating: 1,
          comments: "Terrible experience.",
          submissionDate: "2024-10-10",
        },
        { id: 13, rating: 5, comments: "Loved it!", submissionDate: "2024-10-08" },
        { id: 14, rating: 3, comments: "Mediocre.", submissionDate: "2024-10-05" },
      ];
   
    return (
      <div>
        <Upperheader title="View Reviews" />
        <Reviews title="From Student to Counsellor" data={reviewsData}/>
        
      </div>
    );
  };
  
  export default StudentReviews;
  