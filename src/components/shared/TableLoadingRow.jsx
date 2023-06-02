import React from "react";

const TableLoadingRow = ({ colSpan = 1 }) => {
  return (
    <tr>
      <td colSpan={colSpan} className="text-center">
        <div className="spinner-border spinner-border-sm" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </td>
    </tr>
  );
};

export default TableLoadingRow;
