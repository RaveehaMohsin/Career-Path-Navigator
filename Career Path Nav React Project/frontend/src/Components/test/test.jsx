import React from 'react';
import './App.css'; // Make sure to import the CSS file

const App = () => {
  return (
    <div className="main-container">
      <div className="profile-background-container">
        <div className="profile-container">
          <h2>Profile</h2>
          {/* Profile content here */}
        </div>
        <div className="background-container">
          <h2>Background</h2>
          {/* Background content here */}
        </div>
      </div>


      
      <div className="additional-info-container">
        <h2>Additional Info</h2>
        {/* Additional Info content here */}
      </div>
    </div>
  );
};

export default App;
