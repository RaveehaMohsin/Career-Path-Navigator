import React, { useState } from 'react'
import Upperheader from '../../UpperHeader/upperheader'
import InterestTable from './interesttable'
import AddInterest from './interestaddmodal'

export default function StudentInterestAdd() {

  const [isAddingInterest , setIsAddingInterest] = useState(false)

  const handleInterestClick = () => {
    setIsAddingInterest(true);
  };

  const handleCloseDialog = () => {
    setIsAddingInterest(false);
  };

  return (
    <div>
      <Upperheader title="Interest & Background" />
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
