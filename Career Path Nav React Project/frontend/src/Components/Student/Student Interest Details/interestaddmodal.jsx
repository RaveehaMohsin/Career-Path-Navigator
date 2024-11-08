import React, { useEffect, useState } from "react";
import "./modal.css";
import { FaLightbulb } from "react-icons/fa";

const AddInterest = ({ isOpen, onCancel }) => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 10);
    const formattedDateTime = now.toISOString().slice(0, 16); // YYYY-MM-DDTHH:MM format
    setCurrentDate(formattedDate)
    setCurrentDateTime(formattedDateTime);
  }, []);
  //   const { id } = useParams(); // Get the id from the URL if it exists
  //   const location = useLocation(); // Get the current location object
  //   const [isUpdateMode, setIsUpdateMode] = useState(false);
  //   const [enteredRoomType, setenteredRoomType] = useState('Single');
  //   const [enteredRoompriceperday, setenteredRoompriceperday] = useState('');
  //   const [enteredDescription, setenteredDescription] = useState('');
  //   const [enteredroomImage, setenteredroomImage] = useState('');
  //   const [enteredservantName, setenteredservantName] = useState('');
  //   const [enteredservantContact, setenteredservantContact] = useState('');
  //   const [alertMessage, setAlertMessage] = useState('');
  //   const [isSuccess, setIsSuccess] = useState(false);

  //   useEffect(() => {
  //     if (location.pathname.includes('/update/') && id) {
  //       setIsUpdateMode(true);
  //       // Fetch room details and set the form fields for update
  //       fetchRoomDetails(id);
  //     } else {
  //       setIsUpdateMode(false);

  //     }
  //   }, [location, id]);

  //   const fetchRoomDetails = async (roomId) => {
  //     try {
  //       const response = await fetch(`https://lavender-iron-azimuth.glitch.me/room/${roomId}`);
  //       const roomData = await response.json();
  //       setenteredRoomType(roomData.roomType);
  //       setenteredRoompriceperday(roomData.roomPricePerDay.$numberDecimal);
  //       setenteredDescription(roomData.roomDescription);
  //       setenteredroomImage(roomData.roomImage);
  //       setenteredservantName(roomData.roomServantName);
  //       setenteredservantContact(roomData.servantContact);
  //     } catch (error) {
  //       console.error('Error fetching room details:', error);
  //     }
  //   };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     const roomData = {
  //       roomtype: enteredRoomType,
  //       roompriceperday: enteredRoompriceperday,
  //       roomdescription: enteredDescription,
  //       roomimage: enteredroomImage,
  //       servantname: enteredservantName,
  //       servantcontact: enteredservantContact,
  //     };

  //     const url = isUpdateMode
  //       ? `https://lavender-iron-azimuth.glitch.me/room/update/${id}`
  //       : 'https://lavender-iron-azimuth.glitch.me/roomadd';
  //     const method = isUpdateMode ? 'PUT' : 'POST';

  //     try {
  //       const response = await fetch(url, {
  //         method: method,
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(roomData),
  //       });

  //       if (response.status === 201 || response.status === 200) {
  //         setAlertMessage(`Room ${isUpdateMode ? 'Updated' : 'Added'} Successfully!`);
  //         setIsSuccess(true);
  //       } else {
  //         setAlertMessage(`Failed to ${isUpdateMode ? 'update' : 'add'} room. Please try again.`);
  //         setIsSuccess(false);
  //       }
  //     } catch (error) {
  //       console.error('Error:', error);
  //       setAlertMessage('An error occurred while saving the room.');
  //       setIsSuccess(false);
  //     }
  //   };

  if (!isOpen) return null;

  return (
    <>
      <div className="backdrop" onClick={onCancel}></div>

      <dialog open className={"room-dialog sidebar-closed"}>
        <h2 className="h2class">
          Add Interest <FaLightbulb className="icon" />
        </h2>
        {/* {alertMessage && (
          <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`} role="alert">
            {alertMessage}
          </div>
        )} */}
        <form>
          <p>
            <label className="labelclass">Interest Type</label>
            <input
             className="inputclass"
              id="interesttype"
              name="interesttype"
              type="text"
              placeholder="e.g Cooking , Coding , Fashion Designing"
              //   value={enteredRoompriceperday}
              required
              //   onChange={(e) => setenteredRoompriceperday(e.target.value)}
            />
          </p>

          <p>
            <label className="labelclass">Created At</label>
            <input
              id="interestcreation"
              name="interestcreation"
              type="date"
              readOnly
              value={currentDate}
              className="inputclass"
              //   value={enteredRoompriceperday}
            />
          </p>

          {/* <p>
            <label htmlFor="roomimage">Room Image</label>
            <input
              type="text"
              id="roomimage"
              name="roomimage"
              required
              value={enteredroomImage}
              onChange={(e) => setenteredroomImage(e.target.value)}
            />
          </p>
          <img src={enteredroomImage} alt="RoomPic" width="100%" height="160px" /> */}

          <p className="actions">
            <button className="buttonmodalclass" type="button" onClick={onCancel}>
              Cancel
            </button>
            <button className="buttonmodalclass" type="submit">Add Interest</button>
          </p>
        </form>
      </dialog>
    </>
  );
};

export default AddInterest;
