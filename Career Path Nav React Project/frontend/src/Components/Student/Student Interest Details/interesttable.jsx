import React, { useState } from 'react';
import './interest.css';
import BackgroundTable from './backgroundtable';
import AddBackground from './backgroundaddmodal';

export default function InterestTable({setisbtnclick}) {
    const [isAddingInterest , setIsAddingInterest] = useState(false)

    const handleInterestClick = () => {
      setIsAddingInterest(true);
    };
  
    const handleCloseDialog = () => {
      setIsAddingInterest(false);
    };
  const interests = [
    {
      imgSrc: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
      category: "Music",
      createdAt: "2024-11-08",
    },
    {
      imgSrc: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
      category: "Sports",
      createdAt: "2024-11-08",
    },
  ];

  const handleinterestadd = () =>
  {
    setisbtnclick(true);
  }

  return (
    <div>
    <div className="interest-table-container">
      <table className="interest-table">
        <caption>Your Interests</caption>
        <thead>
          <tr>
            <th>Image</th>
            <th>Interest Category</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {interests.map((interest, index) => (
            <tr key={index}>
              <td><img src={interest.imgSrc} alt="Interest" className="interest-image" /></td>
              <td>{interest.category}</td>
              <td>{interest.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="add-interest-btn" onClick={handleinterestadd}>+</button>
    </div>
    <br />
    <br />
    <BackgroundTable setisbtnclick1 = {handleInterestClick}/>
      {isAddingInterest && (
        <AddBackground
          isOpen={isAddingInterest}
          onCancel={handleCloseDialog}
        />
      )}

    </div>
  );
}
