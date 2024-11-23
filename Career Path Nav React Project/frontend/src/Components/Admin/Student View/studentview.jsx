import React from "react";
import "./studentview.css";
import Upperheader from "../../UpperHeader/upperheader";
import { SiGooglemeet } from "react-icons/si";
import { FaUser } from "react-icons/fa";
import C1 from "../../../Assets/C1.jpg";

const StudentView = () => {
  const tableData = [
    {
      id: 1,
      img: C1,
      name: "John Doe",
      profileStatus: "Active",
      gender: "Male",
      dob: "1990-01-01",
      country: "USA",
    },
    {
      id: 2,
      img: C1,
      name: "Jane Smith",
      profileStatus: "Inactive",
      gender: "Female",
      dob: "1985-05-15",
      country: "Canada",
    },
    {
      id: 3,
      img: C1,
      name: "Samuel Green",
      profileStatus: "Active",
      gender: "Male",
      dob: "1992-09-30",
      country: "UK",
    },
    {
      id: 1,
      img: C1,
      name: "John Doe",
      profileStatus: "Active",
      gender: "Male",
      dob: "1990-01-01",
      country: "USA",
    },
    {
      id: 2,
      img: C1,
      name: "Jane Smith",
      profileStatus: "Inactive",
      gender: "Female",
      dob: "1985-05-15",
      country: "Canada",
    },
    {
      id: 3,
      img: C1,
      name: "Samuel Green",
      profileStatus: "Active",
      gender: "Male",
      dob: "1992-09-30",
      country: "UK",
    },
    {
      id: 1,
      img: C1,
      name: "John Doe",
      profileStatus: "Active",
      gender: "Male",
      dob: "1990-01-01",
      country: "USA",
    },
    {
      id: 2,
      img: C1,
      name: "Jane Smith",
      profileStatus: "Inactive",
      gender: "Female",
      dob: "1985-05-15",
      country: "Canada",
    },
    {
      id: 3,
      img: C1,
      name: "Samuel Green",
      profileStatus: "Active",
      gender: "Male",
      dob: "1992-09-30",
      country: "UK",
    },
    {
      id: 1,
      img: C1,
      name: "John Doe",
      profileStatus: "Active",
      gender: "Male",
      dob: "1990-01-01",
      country: "USA",
    },
    {
      id: 2,
      img: C1,
      name: "Jane Smith",
      profileStatus: "Inactive",
      gender: "Female",
      dob: "1985-05-15",
      country: "Canada",
    },
    {
      id: 3,
      img: C1,
      name: "Samuel Green",
      profileStatus: "Active",
      gender: "Male",
      dob: "1992-09-30",
      country: "UK",
    },
  ];

  return (
    <div>
      <Upperheader title="View Students" />

      <div className="content-container">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th data-label="ID">#</th>
                <th data-label="Student Name">Student Name</th>
                <th data-label="Gender">Gender</th>
                <th data-label="DOB">DOB</th>
                <th data-label="Profile Status">Profile Status</th>
                <th data-label="Country">Country</th>
                <th data-label="View">View</th>
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
