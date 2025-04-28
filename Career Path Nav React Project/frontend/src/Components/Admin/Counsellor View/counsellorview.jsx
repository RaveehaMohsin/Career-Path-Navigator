import React, { useState, useEffect } from "react";
import Upperheader from "../../UpperHeader/upperheader";
import Card from "./card";

const CounsellorView = () => {
  const [counsellors, setCounsellors] = useState([]);  // State to hold counsellor data
  const userData = JSON.parse(localStorage.getItem("CareerPathNavigatorUsers"));
  const username = userData.user.firstName + " " + userData.user.lastName;

  useEffect(() => {
    const fetchCounsellors = async () => {
      try {
        const response = await fetch("http://localhost:4000/getcounsellors");
        const data = await response.json();

        if (response.ok) {
          // Adding image URL or fallback image to each counsellor
          const updatedCounsellors = data.map((counsellor) => ({
            ...counsellor,
            Img: counsellor.Img
              ? `http://localhost:4000${counsellor.Img}`
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe-GsgDIkePXBSguri_zUGTWG0YEY1hMaKNw&s", // Fallback image
          }));
          setCounsellors(updatedCounsellors);  // Update state with modified counsellor data
          console.log(counsellors)
        } else {
          console.error("Failed to fetch counsellors:", data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCounsellors();
  }, []); // Empty dependency array to run once on component mount

  return (
    <div>
      <Upperheader title="View Counsellors" name={username} />
      
      <div className="counsellor-card-grid">
        {counsellors.map((counsellor, index) => (
          <Card
            key={index}  // Use index or a unique identifier as the key
            pic={counsellor.Img}  // Use counsellor's image URL
            heading={`${counsellor.firstName} ${counsellor.lastName}`}
            paragraph={counsellor.email}
            label1={`${counsellor.hourlyRate} /hr `} 
            label2={counsellor.timeSlots}
            label3={counsellor.expertise}
            mycounsellorId={counsellor.userId}
          />
        ))}
      </div>
    </div>
  );
};

export default CounsellorView;
