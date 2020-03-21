import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import GetWeatherData from "../Repo/GetWeatherData";
import GetForecastData from "../Repo/GetForecastData";
import WeatherCard from "./WeatherCard";
import FavoriteActive from "../Images/star.svg";
import FavoriteInactive from "../Images/starInactive.svg";
import "../Styling/weatherCard.css";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [search, setSearch] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const success = async pos => {
        var cord = await pos.coords;
        let result = `lat=${cord.latitude}&lon=${cord.longitude}`;
        let fetchedWeather = await GetWeatherData(result, true);
        let fetchedForecast = await GetForecastData(result, true);

        setWeatherData([fetchedWeather]);
        setForecastData([fetchedForecast]);
        setSearch([fetchedWeather.name]);
      };

      const error = async () => {
        let fetchedWeather = await GetWeatherData("Stockholm");
        let fetchedForecast = await GetForecastData("Stockholm");
        setWeatherData([fetchedWeather]);
        setForecastData([fetchedForecast]);
        setSearch(["Stockholm"]);
      };

      navigator.geolocation.getCurrentPosition(success, error);
    };
    fetch();
    if(localStorage.getItem('favorites') != null){
      setFavorites(JSON.parse(localStorage.getItem('favorites')));
    }
  }, []);

  const handleQuery = async query => {
    let fetchedWeather = await GetWeatherData(query);
    let fetchedForecast = await GetForecastData(query);
    let errElement = document.querySelector(".errMessage");

    if (fetchedWeather.cod === 200) {
      errElement.style.display = "none";
      if (!search.includes(fetchedWeather.name)) {
        setSearch([...search, fetchedWeather.name]);
        let storedWeather = [...weatherData, fetchedWeather];
        let storedForecast = [...forecastData, fetchedForecast];
        setWeatherData(storedWeather);
        setForecastData(storedForecast);
      }
    } else {
      console.log("No data");
      errElement.style.display = "initial";
    }
  };

  const handleWeatherPromise = async (data) => {
    setSearch(favorites);
    setWeatherData(data);
  };

  const handleForecastPromise = async data => {
    setForecastData(data);
  };

  const removeCity = e => {
    let currWeather = [...weatherData];
    let currForecast = [...forecastData];
    let currSearch = [...search];

    let filterWeather = currWeather.filter(c => c.name.trim() !== e.target.id);
    let filterForecast = currForecast.filter(
      c => c.city.name.trim() !== e.target.id
    );
    let filterSearch;

    if (currSearch.length > 1) {
      filterSearch = currSearch.filter(c => c !== e.target.id);
    } else {
      filterSearch = [];
    }

    setWeatherData(filterWeather);
    setForecastData(filterForecast);
    setSearch(filterSearch);
  };

  const toggleFavorite = e => {
    if (favorites.includes(e.target.id)) {
      let currFavorites = [...favorites];
      let filterFavorites = currFavorites.filter(c => c !== e.target.id);
      setFavorites(filterFavorites);
      localStorage.setItem("favorites", JSON.stringify(filterFavorites));
      e.target.src = FavoriteInactive;
    } else {
      let currFavorites = [...favorites, e.target.id];
      setFavorites(currFavorites);
      localStorage.setItem("favorites", JSON.stringify(currFavorites));
      e.target.src = FavoriteActive;
    }
  };

  return (
    <div className="Container">
      <div className="row">
        <div className="input-field col s10 offset-s1 m6 offset-m3">
          <SearchBar
            queryString={handleQuery}
            weatherPromise={handleWeatherPromise}
            forecastPromise={handleForecastPromise}
          />
        </div>
      </div>
      <WeatherCard
        forecastData={forecastData}
        weatherData={weatherData}
        removeCity={removeCity}
        toggleFavorite={toggleFavorite}
      />
    </div>
  );
};

export default WeatherApp;
