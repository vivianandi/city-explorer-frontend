import React, { useState } from 'react';
import axios from 'axios';
import WeatherSearch from './components/WeatherSearch';
import Weather from './components/Weather';

const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
const movieApiKey = process.env.REACT_APP_MOVIE_API_KEY;

function App() {
  const [location, setLocation] = useState({});
  const [weather, setWeather] = useState([]);

  async function handleSearch(city) {
    try {
      const locationURL = `/location?city=${city}`;
      const response = await axios.get(locationURL);
      const data = response.data;
      setLocation(data);
      await getWeather(data);
    } catch (error) {
      console.error('Error searching for city:', error);
    }
  }

  async function getWeather(location) {
    try {
      const url = `/weather?latitude=${location.latitude}&longitude=${location.longitude}`;
      const response = await axios.get(url);
      const data = response.data;
      setWeather(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  return (
    <>
      <WeatherSearch handleSearch={handleSearch} />
      <City location={location} />
      <Weather weather={weather} />
    </>
  );
}

export default App;
