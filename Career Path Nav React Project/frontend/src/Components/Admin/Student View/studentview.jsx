import React, { useState } from "react";
import "./studentview.css";
import Upperheader from "../../UpperHeader/upperheader";
import { SiGooglemeet } from "react-icons/si";
import { FaUser } from "react-icons/fa";
import C1 from "../../../Assets/C1.jpg";

const StudentView = () => {
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [tableData, setTableData] = useState([
    { id: 1, img: C1, name: "John Doe", profileStatus: "Active", gender: "Male", dob: "1990-01-01", country: "USA" },
    { id: 2, img: C1, name: "Jane Smith", profileStatus: "Inactive", gender: "Female", dob: "1985-05-15", country: "Canada" },
    { id: 3, img: C1, name: "Samuel Green", profileStatus: "Active", gender: "Male", dob: "1992-09-30", country: "UK" },
    { id: 4, img: C1, name: "John Doe", profileStatus: "Active", gender: "Male", dob: "1990-01-01", country: "USA" },
    { id: 5, img: C1, name: "Jane Smith", profileStatus: "Inactive", gender: "Female", dob: "1985-05-15", country: "Canada" },
    { id: 6, img: C1, name: "Samuel Green", profileStatus: "Active", gender: "Male", dob: "1992-09-30", country: "UK" },
    { id: 7, img: C1, name: "John Doe", profileStatus: "Active", gender: "Male", dob: "1990-01-01", country: "USA" },
    { id: 8, img: C1, name: "Jane Smith", profileStatus: "Inactive", gender: "Female", dob: "1985-05-15", country: "Canada" },
    { id: 9, img: C1, name: "Samuel Green", profileStatus: "Active", gender: "Male", dob: "1992-09-30", country: "UK" },
    { id: 10, img: C1, name: "John Doe", profileStatus: "Active", gender: "Male", dob: "1990-01-01", country: "USA" },
    { id: 11, img: C1, name: "Jane Smith", profileStatus: "Inactive", gender: "Female", dob: "1985-05-15", country: "Canada" },
    { id: 13, img: C1, name: "Samuel Green", profileStatus: "Active", gender: "Male", dob: "1992-09-30", country: "UK" },
    { id: 14, img: C1, name: "John Doe", profileStatus: "Active", gender: "Male", dob: "1990-01-01", country: "USA" },
    { id: 15, img: C1, name: "Jane Smith", profileStatus: "Inactive", gender: "Female", dob: "1985-05-15", country: "Canada" },
    { id: 16, img: C1, name: "Samuel Green", profileStatus: "Active", gender: "Male", dob: "1992-09-30", country: "UK" },
    // Add more entries here...
  ]);

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
      <Upperheader title="View Students" />

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
                <th onClick={() => sortData("profileStatus")}>
                  Profile Status {getSortArrow("profileStatus")}
                </th>
                <th onClick={() => sortData("country")}>
                  Country {getSortArrow("country")}
                </th>
                <th>View</th>
              </tr>
            </thead>

            <tbody>
              {tableData.map((item) => (
                <tr key={item.id}>
                  <th>{item.id}</th>
                  <td>
                    <img
                      src={item.img}
                      alt={item.name}
                      className="table-profile-image"
                    />
                    {item.name}
                  </td>
                  <td>{item.gender}</td>
                  <td>{item.dob}</td>
                  <td>{item.profileStatus}</td>
                  <td>{item.country}</td>
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

export default StudentView;
