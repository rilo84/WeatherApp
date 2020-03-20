import React, { useState, useEffect } from "react";

const SearchBar = props => {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    let storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    setFavorites(storedFavorites);
  }, []);

  const handleSubmit = () => {
    props.queryString(search);
  };

  const handleFavorites = async () => {
    favorites.forEach(c => {
      props.queryString(c);
    });

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
      <div className="btnContainer">
        <button
          className="waves-effect waves-light btn"
          onClick={handleFavorites}
        >
          Visa favoriter
        </button>
        <button className="waves-effect waves-light btn" onClick={handleSubmit}>
          Lägg till
        </button>
      </div>
    </>
  );
};

export default SearchBar;
