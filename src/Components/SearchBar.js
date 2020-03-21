import React, { useState} from "react";
import GetWeatherData from "../Repo/GetWeatherData";
import GetForecastData from "../Repo/GetForecastData";

const SearchBar = props => {
  const [search, setSearch] = useState("");

  const handleSubmit = () => {
    props.queryString(search);
  };

  const handleFavorites = async () => {
    let weatherPromises = [];
    let forecastPromises = [];

    let favorites = JSON.parse(localStorage.getItem('favorites'));
    if(favorites === null) favorites = [];

    for (let i = 0; i < favorites.length; i++) {
      weatherPromises.push(GetWeatherData(favorites[i]));
      forecastPromises.push(GetForecastData(favorites[i]));
    }

    Promise.all(weatherPromises)
    .then(data => {
      props.weatherPromise(data);
    });

    Promise.all(forecastPromises)
    .then(data => {
      props.forecastPromise(data);
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
