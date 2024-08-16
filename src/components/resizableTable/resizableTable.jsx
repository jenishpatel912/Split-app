import React, { useState } from 'react';
import './ResizableTable.css'; // Import the CSS file

const ResizableTable = () => {
  const [resizing, setResizing] = useState(null);
  const [columnWidths, setColumnWidths] = useState({
    column1: 150,
    column2: 200,
    // Add more columns as needed
  });

  const handleMouseDown = (column) => {
    setResizing(column);
  };

  const handleMouseMove = (e) => {
    if (resizing) {
      const newWidth = e.clientX;
      setColumnWidths((prevWidths) => ({
        ...prevWidths,
        [resizing]: newWidth,
      }));
    }
  };

  const handleMouseUp = () => {
    setResizing(null);
  };

  return (
    <div
      className="resizable-table-container"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <table className="resizable-table">
        <thead>
          <tr>
            <th style={{ width: columnWidths.column1 }}>
              Column 1
              <div
                className="resizer"
                onMouseDown={() => handleMouseDown('column1')}
              ></div>
            </th>
            <th style={{ width: columnWidths.column2 }}>
              Column 2
              <div
                className="resizer"
                onMouseDown={() => handleMouseDown('column2')}
              ></div>
            </th>
            {/* Add more headers as needed */}
          </tr>
        </thead>
        <tbody>
          {/* Add table body content */}
        </tbody>
      </table>
    </div>
  );
};

export default ResizableTable;
