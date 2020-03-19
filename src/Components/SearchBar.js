import React, { useState } from "react";

const SearchBar = props => {
  const [search, setSearch] = useState("");

  const handleSubmit = () => {
    props.queryString(search);
  };

  return (
    <>
      <div>
      <label className="active" htmlFor="searchBar">
          Ange stad:
        </label>
        <input
          id="searchBar"
          onChange={e => setSearch(e.target.value)}
          type="text"
        />
        
      </div>
      <button className="waves-effect waves-light btn" onClick={handleSubmit}>
        Lägg till
      </button>
    </>
  );
};

export default SearchBar;
