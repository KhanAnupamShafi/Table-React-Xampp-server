import React from "react";

const Search = (props) => {
  const { searchType } = props;
  const type = searchType === "num" ? "number" : "text";

  return (
    <div>
      <input
        className="text-lg border border-2 rounded-r px-4 py-2 w-full"
        type={type}
        value={props.filter}
        placeholder={props.placeholder}
        onChange={(e) => props.handleFilterChange(e.target.value, searchType)}
      />
    </div>
  );
};

export default Search;
