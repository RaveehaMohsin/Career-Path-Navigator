import React, { useEffect, useState } from 'react';
import './interest.css';
import BackgroundTable from './backgroundtable';
import AddBackground from './backgroundaddmodal';

export default function InterestTable({ setisbtnclick }) {
  const [isAddingInterest, setIsAddingInterest] = useState(false);
  const [interests, setInterests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const randomImages = [
    "https://cdn-icons-png.flaticon.com/512/3745/3745452.png",
  ];

  const fetchInterests = async () => {
    try {
      setIsLoading(true);
      const userId = JSON.parse(localStorage.getItem("CareerPathNavigatorUsers")).user.userId;
      const response = await fetch(`http://localhost:4000/getinterest/${userId}`);
      const data = await response.json();

      if (response.ok) {
        const interestsWithImages = data.map((interest) => ({
          ...interest,
          imgSrc: randomImages[Math.floor(Math.random() * randomImages.length)],
        }));
        setInterests(interestsWithImages);
      } else {
        setInterests([]);
      }
    } catch (error) {
      console.error("Error fetching interests:", error);
      setInterests([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInterests();
  }, []);

  const handleReload = () => {
    fetchInterests(); 
  };

  const handleInterestClick = () => {
    setIsAddingInterest(true);
  };

  const handleCloseDialog = () => {
    setIsAddingInterest(false);
    setSelectedRecord(null); 
    setIsEditing(false); 
  };

  const handleInterestAdd = () => {
    setisbtnclick(true);
  };

  return (
    <div>
      <div className="interest-table-container">
        <table className="interest-table">
          <caption>
            Your Interests
            <button className="btntable" onClick={handleReload}>Reload</button>
          </caption>
          <thead>
            <tr>
              <th>Image</th>
              <th>Interest Category</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>Loading...</td>
              </tr>
            ) : interests.length > 0 ? (
              interests.map((interest, index) => (
                <tr key={index}>
                  <td><img src={interest.imgSrc} alt="Interest" className="interest-image" /></td>
                  <td>{interest.category}</td>
                  <td>{new Date(interest.created_at).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>No interests found.</td>
              </tr>
            )}
          </tbody>
        </table>

        <button className="add-interest-btn" onClick={handleInterestAdd}>+</button>
      </div>
      <br />
      <br />
      <BackgroundTable 
        setisbtnclick1={handleInterestClick}        
        setSelectedRecord={setSelectedRecord}
        setIsEditing={setIsEditing} 
      />
      {isAddingInterest && (
        <AddBackground
          isOpen={isAddingInterest}
          onCancel={handleCloseDialog}
          selectedRecord={selectedRecord}
          isEditing={isEditing}
        />
      )}
    </div>
  );
}
