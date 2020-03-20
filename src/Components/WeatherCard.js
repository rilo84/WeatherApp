import React, { useEffect } from "react";
import "../Styling/weatherCard.css";
import CloseImg from "../Images/close.svg";
import FavImg from "../Images/starInactive.svg";
import FavoriteActive from "../Images/star.svg";
import GetDay from "../Helpers/GetDay";

const WeatherCard = props => {
  let forecast = props.forecastData.map(c => {
    let forecastDate = new Date(c.list[0].dt * 1000);
    let forecastDay = forecastDate.getDay();
    let city = c.city.name.trim();
    return (
      <div key={city} className="forecastRow">
        <div className="forecastCol">
          <p>{GetDay(forecastDay)}</p>
          <img
            src={
              "http://openweathermap.org/img/wn/" +
              c.list[7].weather[0].icon +
              "@2x.png"
            }
            alt="icon"
          ></img>
          <p>min {c.list[7].main.temp_min}&#176;c</p>
          <p>max {c.list[7].main.temp_max}&#176;c</p>
        </div>
        <div className="forecastCol">
          <p>{GetDay(forecastDay + 1)}</p>
          <img
            src={
              "http://openweathermap.org/img/wn/" +
              c.list[15].weather[0].icon +
              "@2x.png"
            }
            alt="icon"
          ></img>
          <p>min {c.list[15].main.temp_min}&#176;c</p>
          <p>max {c.list[15].main.temp_max}&#176;c</p>
        </div>
        <div className="forecastCol">
          <p>{GetDay(forecastDay + 2)}</p>
          <img
            src={
              "http://openweathermap.org/img/wn/" +
              c.list[23].weather[0].icon +
              "@2x.png"
            }
            alt="icon"
          ></img>
          <p>min {c.list[23].main.temp_min}&#176;c</p>
          <p>max {c.list[23].main.temp_max}&#176;c</p>
        </div>
        <div className="forecastCol">
          <p>{GetDay(forecastDay + 3)}</p>
          <img
            src={
              "http://openweathermap.org/img/wn/" +
              c.list[31].weather[0].icon +
              "@2x.png"
            }
            alt="icon"
          ></img>
          <p>min {c.list[31].main.temp_min}&#176;c</p>
          <p>max {c.list[31].main.temp_max}&#176;c</p>
        </div>
        <div className="forecastCol">
          <p>{GetDay(forecastDay + 4)}</p>
          <img
            src={
              "http://openweathermap.org/img/wn/" +
              c.list[39].weather[0].icon +
              "@2x.png"
            }
            alt="icon"
          ></img>
          <p>min {c.list[39].main.temp_min}&#176;c</p>
          <p>max {c.list[39].main.temp_max}&#176;c</p>
        </div>
      </div>
    );
  });

  useEffect(()=>{
    let storedFavorites = JSON.parse(localStorage.getItem('favorites'));
    storedFavorites.forEach(c => {
      let firstWord = c.split(" ");
      let favImg = document.querySelector(`.${firstWord[0]}`);
      if(favImg != null){
        favImg.src=FavoriteActive;
      }
    });
  })

  let currentWeather = props.weatherData.map(c => {
    let currDate = new Date(c.dt * 1000).toLocaleString();
    let temperature = Math.round(c.main.temp);
    let city = c.name.trim();
    return (
      <div key={city} className="row cardRow">
        <div className="wCard">
          <div className="headerRow">
            <img
              id={c.name}
              className={c.name}
              src={FavImg}
              onClick={props.toggleFavorite}
              alt="favorite"
            />
            <h5>{city}</h5>
            <img
              src={CloseImg}
              id={city}
              onClick={props.removeCity}
              alt="close"
            />
          </div>
          <div className="currWeatherRow">
            <img
              src={
                "http://openweathermap.org/img/wn/" +
                c.weather[0].icon +
                "@2x.png"
              }
              alt="icon"
            ></img>
            <h3>{temperature}&#176;c</h3>
            <div className="infoCol">
              <p>Idag</p>
              <p>{currDate}</p>
              <p>{c.weather[0].description}</p>
            </div>
          </div>
          {forecast.filter(c => c.key === city)}
        </div>
      </div>
    );
  });

  return <>{currentWeather}</>;
};

export default WeatherCard;
