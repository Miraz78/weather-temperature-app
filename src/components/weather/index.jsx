import React, { useEffect, useState } from 'react'
import config from '../../assets/Config';
import axios from "axios";
import "../../styles/weather.css";

function Weather() {
  const [currentLocation, setCurrentLocation] = useState('');
  const [weather, setWeather] = useState({});
  const [query, setQuery] = useState('');
  const [showMore, setShowMore] = useState(false);


  const getCurrentLocation = async () => {
    try {

      const response = await axios.get(config.currentLoc)
      setCurrentLocation(response.data.city)
    }
    catch (error) {
      console.log(error)
    }

  }

  const searchQuery = async () => {
    try {
      const res = await axios
        .get(config.weatherURL, {
          params: {
            q: query ? query : currentLocation,
            units: "metric",
            APPID: config.ApiKey,
          },
        })
      setWeather(res.data);
      setQuery('')
      console.log(res.data);
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCurrentLocation();
  }, [])

  useEffect(() => {
    if (currentLocation) {
      searchQuery();
    }
  }, [currentLocation])

  return (
    <div className="main-container">
      <input
        type="text"
        className="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key == 'Enter') {
            searchQuery()
          }
        }}
      />
      <button className="submit_btn" onClick={() => searchQuery()}>Click</button>
      {weather?.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather?.name}</span>
            <sup>{weather?.sys?.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather?.main?.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather?.weather?.[0]?.icon}@2x.png`}
              alt={weather?.weather?.[0]?.description}
            />
            <p>{weather?.weather?.[0]?.description}</p>
          </div>
          <span
            className="view_more"
            onClick={() => setShowMore(!showMore)}
            style={{ cursor: "pointer", color: "blue" }}
          >
            {showMore ? "Hide Details" : "View More"}
          </span>
          {showMore && (
            <>
              <p >Humidity: {weather?.main?.humidity}</p>
              <p >Pressure: {weather?.main?.pressure}</p>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default Weather
