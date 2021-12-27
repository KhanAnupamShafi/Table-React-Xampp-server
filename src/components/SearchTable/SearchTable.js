import React from "react";
import { useState } from "react";

const SearchTable = ({ tableData, setSearchTerm, setIsActive }) => {
  return (
    <tr>
      {Object.keys(tableData).map((key, index) => {
        return tableData[key].searchable ? (
          <th key={index}>
            <input
              placeholder={`search by ${[key]}`}
              className="p-1 bg-slate-600 text-white"
              type="text"
              onChange={(event) => {
                if (index === 0) {
                  setSearchTerm(event.target.value.toString());
                  setIsActive(index);
                } else if (index === 1) {
                  setSearchTerm(event.target.value);
                  setIsActive(index);
                } else if (index === 2) {
                  setSearchTerm(event.target.value);
                  setIsActive(index);
                } else if (index === 3) {
                  setSearchTerm(event.target.value);
                  setIsActive(index);
                }
              }}
            />
          </th>
        ) : (
          <th key={index}></th>
        );
      })}
    </tr>
  );
};

export default SearchTable;
