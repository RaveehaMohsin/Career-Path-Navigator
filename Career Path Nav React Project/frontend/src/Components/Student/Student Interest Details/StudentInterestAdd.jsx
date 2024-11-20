import React, { useState } from 'react'
import Upperheader from '../../UpperHeader/upperheader'
import InterestTable from './interesttable'
import AddInterest from './interestaddmodal'

export default function StudentInterestAdd() {
  const userData = JSON.parse(localStorage.getItem("CareerPathNavigatorUsers"));
  const currentuser = userData.user;
  const username = currentuser.firstName + " " + currentuser.lastName;

  const [isAddingInterest , setIsAddingInterest] = useState(false)

  const handleInterestClick = () => {
    setIsAddingInterest(true);
  };

  const handleCloseDialog = () => {
    setIsAddingInterest(false);
  };

  return (
    <div>
      <Upperheader title="Interest & Background" name={username} />
      <InterestTable setisbtnclick = {handleInterestClick}/>
      {isAddingInterest && (
        <AddInterest
          isOpen={isAddingInterest}
          onCancel={handleCloseDialog}
        />
      )}


    </div>
  )
}
