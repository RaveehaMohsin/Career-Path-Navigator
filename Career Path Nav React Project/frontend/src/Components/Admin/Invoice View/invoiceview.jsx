import React, { useState, useEffect } from "react";
import "./invoiceview.css";
import Upperheader from "../../UpperHeader/upperheader";

const InvoiceView = () => {
  const [data, setData] = useState([]);  
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const userData = JSON.parse(localStorage.getItem("CareerPathNavigatorUsers"));
  const username = userData.user.firstName + " " + userData.user.lastName;
  const userId = userData.user.userId; 

  const invoicesPerPage = 12;
  const totalPages = Math.ceil(data.length / invoicesPerPage);

  const getRandomStatusClass = () => {
    const statuses = ['status-paid', 'status-pending', 'status-overdue'];
    const randomIndex = Math.floor(Math.random() * statuses.length);
    return statuses[randomIndex];
  };

  // Fetch invoices from the backend on component mount
  useEffect(() => {
    // Check if the URL contains "counsellor"
    const isCounsellorView = window.location.pathname.includes("counsellor");

    fetch("https://marshy-brainy-weight.glitch.me/get-invoices")
      .then((response) => response.json()) // Assuming the API returns JSON
      .then((invoices) => {
        // Hardcoding the status to "Paid" for all invoices as per your request
        const updatedInvoices = invoices.map((invoice) => ({
          ...invoice,
          status: "Paid",
          statusClass: getRandomStatusClass(), // Hardcode status as 'Paid'
        }));

        // If URL has "counsellor", filter invoices based on counsellorId
        const filteredInvoices = isCounsellorView
          ? updatedInvoices.filter((invoice) => invoice.counsellorId === userId)
          : updatedInvoices;

        setData(filteredInvoices); // Set fetched data to state
        console.log(filteredInvoices); // Log the data to see what it looks like
      })
      .catch((error) => console.error("Error fetching invoices:", error));
  }, [userId]); // Adding userId as a dependency to re-fetch when it changes



  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const sortData = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    const sortedData = [...data].sort((a, b) => {
      if (key === "amount") {
        return direction === "ascending" ? a[key] - b[key] : b[key] - a[key];
      } else if (key === "timeIssues") {
        // Format the date before comparing
        const dateA = new Date(a[key]);
        const dateB = new Date(b[key]);
        return direction === "ascending" ? dateA - dateB : dateB - dateA;
      } else {
        return direction === "ascending"
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      }
    });

    setData(sortedData);
    setSortConfig({ key, direction });
  };

  // Format the date as 'YYYY-MM-DD'
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-CA"); // Format to 'YYYY-MM-DD'
  };

  return (
    <div>
      <Upperheader title="View your Invoices" name={username} />
      <div className="invoice-container">
        <h1 className="invoice-title">Invoices</h1>

        <div className="filters">
          <button onClick={() => sortData("timeIssues")}>
            Sort by Time Issued
          </button>
          <button onClick={() => sortData("status")}>Sort by Status</button>
          <button onClick={() => sortData("amount")}>Sort by Amount</button>
        </div>

        <div className="invoice-cards">
          {data.map((invoice) => (
            <div key={invoice.invoiceId} className="invoice-card">
              <div className="card-row">
                <span className="label">Time Issued:</span>
                <span>{formatDate(invoice.timeIssues)}</span> {/* Display formatted date */}
              </div>
              <div className="card-row">
                <span className="label">Status:</span>
                <span
                  className={`status ${invoice.statusClass}`}
                >
                  {invoice.status}
                </span>
              </div>
              <div className="card-row">
                <span className="label">Amount:</span>
                <span className="amount">${invoice.amount.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            &larr; Previous
          </button>
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceView;
