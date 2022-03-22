import React, { useState } from "react";
import "./weather.css";

const API_KEY = "858f15fed9292cbe25c341a754c55e45";

const Weather = () => {
  const [searchTxt, setSearchTxt] = useState("");
  const [city, setCity] = useState([]);
  const [weather, setWeather] = useState({});

  const handleSearch = () => {
    console.log(process.env);
    if (searchTxt) {
      fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${searchTxt}&limit=5&appid=${API_KEY}`
      )
        .then((resp) => resp.json())
        .then((result) => {
          setCity(result);
          setWeather({})
        });
    }
  };

  const handleGetWeather = (cityDetail) => {
    if (cityDetail) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${cityDetail.lat}&lon=${cityDetail.lon}&appid=${API_KEY}`
      )
        .then((resp) => resp.json())
        .then((result) => {
          console.log(result);
          setWeather(result);
        });
    }
  };

  return (
    <div className="main-container">
      <div className="search-container">
        <input
          value={searchTxt}
          onChange={(e) => setSearchTxt(e.target.value)}
          className="search-input"
          placeholder="Enter your city"
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>
      {Boolean(city.length) && <h1>Select Your City</h1>}
      <div className="city-list-container">
        {city.map((item) => {
          return (
            <div className="city-tag" onClick={() => handleGetWeather(item)}>
              {`${item.name}, ${item.state}, ${item.country}`}{" "}
            </div>
          );
        })}
      </div>
      {Boolean(Object.keys(weather).length) && <div className="body-container">
          <span>
            <h1>{`Temp : ${Number(weather.main.temp - 273.15).toFixed(2)} °C`}</h1>
            <h3>{`Weather Type: ${weather.weather[0].description}`}</h3>
            <h3>{`Humidity: ${weather.main.humidity}%`}</h3>
            <h3>{`Location: ${weather.name}`}</h3>
          </span>
          </div>}
    </div>
  );
};

export default Weather;
