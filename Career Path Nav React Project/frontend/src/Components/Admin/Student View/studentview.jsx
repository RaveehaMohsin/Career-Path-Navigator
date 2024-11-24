import React, { useState, useEffect } from "react";
import "./studentview.css";
import Upperheader from "../../UpperHeader/upperheader";
import { SiGooglemeet } from "react-icons/si";
import { FaUser } from "react-icons/fa";

const StudentViewAdmin = () => {
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [tableData, setTableData] = useState([]);
  const [images, setImages] = useState([]);
  const userData = JSON.parse(localStorage.getItem("CareerPathNavigatorUsers"));
  const username = userData.user.firstName + " " + userData.user.lastName;

  // Fetch students data on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      // Make the fetch request to your backend endpoint
      const response = await fetch("http://localhost:4000/getstudents"); // Replace with your API URL
      if (response.ok) {
        const data = await response.json(); // Parse the JSON response
        setTableData(data); // Update state with the fetched data
        const studentImages = data.map(student => {
          return student.Img ? `http://localhost:4000${student.Img}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe-GsgDIkePXBSguri_zUGTWG0YEY1hMaKNw&s'; // Fallback to C1 if Img is missing
        });
        setImages(studentImages);
      } else {
        console.error("Failed to fetch students data");
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const sortData = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    const sortedData = [...tableData].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setTableData(sortedData);
    setSortConfig({ key, direction });
  };

  const getSortArrow = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? "↑" : "↓";
    }
    return null;
  };

  return (
    <div>
      <Upperheader title="View Students" name={username} />

      <div className="content-container">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th onClick={() => sortData("id")}>
                  ID {getSortArrow("id")}
                </th>
                <th onClick={() => sortData("name")}>
                  Student Name {getSortArrow("name")}
                </th>
                <th onClick={() => sortData("gender")}>
                  Gender {getSortArrow("gender")}
                </th>
                <th onClick={() => sortData("dob")}>
                  DOB {getSortArrow("dob")}
                </th>
                <th onClick={() => sortData("city")}>
                  City {getSortArrow("city")}
                </th>
                <th onClick={() => sortData("country")}>
                  Country {getSortArrow("country")}
                </th>
                <th>View</th>
              </tr>
            </thead>

            <tbody>
              {tableData.map((item , index) => (
                <tr key={item.id}>
                  <th>{item.userId}</th>
                  <td>
                    <img
                      src={images[index]}// Use fallback image if 'img' is missing
                      alt={item.name}
                      className="table-profile-image"
                    />
                    {item.firstName} {item.lastName}
                  </td>
                  <td>{item.Gender}</td>
                  <td>{item?.DOB ? formatDate(item?.DOB) : "Not set"}</td>
                  <td>{item.City}</td>
                  <td>{item.Country}</td>
                  <td>
                    <button className="view-button">
                      <FaUser />
                    </button>
                    <button className="view-button">
                      <SiGooglemeet />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentViewAdmin;
