import React from "react";
import styles from "./detailMeetList.module.css";

const DataTableMeetView = ({ columns, data, title }) => {
  return (
    <div className={styles.meetContainer}>
      {title && <h1 className={styles.meetHeading}>{title}</h1>}
      <div className={styles.tableMeet}>
        <table className={styles.detailMeetTable}>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>
                    {col.toLowerCase() === "meet link" ? (
                      <a
                        href={row[col]}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {row[col]}
                      </a>
                    ) : (
                      row[col]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTableMeetView;
