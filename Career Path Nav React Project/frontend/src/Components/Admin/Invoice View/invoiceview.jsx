import React, { useState } from "react";
import "./invoiceview.css";
import Upperheader from "../../UpperHeader/upperheader";

const InvoiceView = () => {
  const initialInvoices = [
    { id: 1, timeIssued: "2024-11-01 10:30", status: "Paid", amount: 200.5 },
    { id: 2, timeIssued: "2024-10-29 14:00", status: "Pending", amount: 100.0 },
    { id: 3, timeIssued: "2024-11-20 09:15", status: "Overdue", amount: 500.0 },
    { id: 4, timeIssued: "2024-11-15 12:00", status: "Paid", amount: 150.75 },
    { id: 5, timeIssued: "2024-11-10 08:45", status: "Pending", amount: 300.2 },
    {
      id: 6,
      timeIssued: "2024-10-28 16:30",
      status: "Overdue",
      amount: 450.75,
    },
    { id: 7, timeIssued: "2024-10-15 09:30", status: "Paid", amount: 275.5 },
    { id: 8, timeIssued: "2024-11-05 14:50", status: "Pending", amount: 125.0 },
    { id: 9, timeIssued: "2024-11-18 11:20", status: "Paid", amount: 350.0 },
    {
      id: 10,
      timeIssued: "2024-11-12 10:00",
      status: "Overdue",
      amount: 225.5,
    },
    { id: 11, timeIssued: "2024-11-03 13:10", status: "Paid", amount: 275.3 },
    {
      id: 12,
      timeIssued: "2024-10-30 15:45",
      status: "Pending",
      amount: 410.0,
    },
    { id: 13, timeIssued: "2024-10-22 12:25", status: "Paid", amount: 199.5 },
    {
      id: 14,
      timeIssued: "2024-11-07 08:50",
      status: "Overdue",
      amount: 520.0,
    },
    {
      id: 15,
      timeIssued: "2024-10-25 18:30",
      status: "Pending",
      amount: 345.0,
    },
    { id: 16, timeIssued: "2024-10-27 10:15", status: "Paid", amount: 400.5 },
  ];

  const [data, setData] = useState(initialInvoices);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const invoicesPerPage = 12;
  const totalPages = Math.ceil(data.length / invoicesPerPage);

  const currentInvoices = data.slice(
    (currentPage - 1) * invoicesPerPage,
    currentPage * invoicesPerPage
  );

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
      } else if (key === "timeIssued") {
        return direction === "ascending"
          ? new Date(a[key]) - new Date(b[key])
          : new Date(b[key]) - new Date(a[key]);
      } else {
        return direction === "ascending"
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      }
    });

    setData(sortedData);
    setSortConfig({ key, direction });
  };

  return (
    <div>
      <Upperheader title="View Invoices" />
      <div className="invoice-container">
        <h1 className="invoice-title">Invoices</h1>

        <div className="filters">
          <button onClick={() => sortData("timeIssued")}>
            Sort by Time Issued
          </button>
          <button onClick={() => sortData("status")}>Sort by Status</button>
          <button onClick={() => sortData("amount")}>Sort by Amount</button>
        </div>

        <div className="invoice-cards">
          {currentInvoices.map((invoice) => (
            <div key={invoice.id} className="invoice-card">
              <div className="card-row">
                <span className="label">Time Issued:</span>
                <span>{invoice.timeIssued}</span>
              </div>
              <div className="card-row">
                <span className="label">Status:</span>
                <span
                  className={`status ${
                    invoice.status.toLowerCase() === "paid"
                      ? "status-paid"
                      : invoice.status.toLowerCase() === "pending"
                      ? "status-pending"
                      : "status-overdue"
                  }`}
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
