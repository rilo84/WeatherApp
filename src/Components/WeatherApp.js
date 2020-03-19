import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import GetWeatherData from "../Repo/GetWeatherData";
import GetForecastData from "../Repo/GetForecastData";
import WeatherCard from "./WeatherCard";
import "../Styling/weatherCard.css";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const success = async (pos) => {
        var cord = await pos.coords;
        let result = `lat=${cord.latitude}&lon=${cord.longitude}`;
        let fetchedWeather = await GetWeatherData(result,true);
        let fetchedForecast = await GetForecastData(result,true);

        setWeatherData([fetchedWeather]);
        setForecastData([fetchedForecast]);
        setSearch([fetchedWeather.name])
      }
      
      const error = async () => {
       let fetchedWeather = await GetWeatherData('Stockholm');
       let fetchedForecast = await GetForecastData('Stockholm');
       setWeatherData([fetchedWeather]);
       setForecastData([fetchedForecast]);
       setSearch(['Stockholm'])
      }
      
      navigator.geolocation.getCurrentPosition(success, error);
    };
    fetch();
  }, []);

  const handleQuery = async query => {
    query = query[0].toUpperCase() + query.slice(1).toLowerCase();

    if (!search.includes(query)) {
      let fetchedWeather = await GetWeatherData(query);
      let fetchedForecast = await GetForecastData(query);
      if (fetchedWeather.cod === 200) {
        setSearch([...search, query]);
        let storedWeather = [...weatherData, fetchedWeather];
        let storedForecast = [...forecastData, fetchedForecast];
        setWeatherData(storedWeather);
        setForecastData(storedForecast);
      } else {
        console.log("No data");
      }
    }
  };

  const removeCity = e => {
    let currWeather = [...weatherData];
    let currForecast = [...forecastData];
    let currSearch = [...search];

    let filterWeather = currWeather.filter(c => c.name !== e.target.id);
    let filterForecast = currForecast.filter(c => c.city.name !== e.target.id);
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

  return (
    <div className="Container">
      <div className="row">
        <div className="input-field col s10 offset-s1 m6 offset-m3">
          <SearchBar queryString={handleQuery} />
        </div>
      </div>
      <WeatherCard
        forecastData={forecastData}
        weatherData={weatherData}
        removeCity={removeCity}
      />
    </div>
  );
};

export default WeatherApp;
