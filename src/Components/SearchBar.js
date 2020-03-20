import React, { useState } from "react";

const SearchBar = props => {
  const [search, setSearch] = useState("");

  const handleSubmit = () => {
    props.queryString(search);
  };

  const handleFavorites = () =>{
    let storedFavorites = JSON.parse(localStorage.getItem('favorites'));
    storedFavorites.forEach(c => {
      setSearch(c);
      handleSubmit();
    });
  }

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
      <button className="waves-effect waves-light btn" onClick={handleFavorites}>
        Visa favoriter
      </button>
    </>
  );
};

export default SearchBar;
