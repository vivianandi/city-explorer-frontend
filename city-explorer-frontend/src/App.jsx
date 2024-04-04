import React, { useState } from 'react';
import axios from 'axios';
import WeatherSearch from './components/WeatherSearch';
import Weather from './components/Weather';
import Movies from './components/Movies'; t

const weatherApiKey = process.env.WEATHER_API_KEY;
const movieApiKey = process.env.MOVIE_API_KEY;

function App() {
  const [location, setLocation] = useState({});
  const [weather, setWeather] = useState([]);
  const [movies, setMovies] = useState([]); // State for storing movie data

  async function handleSearch(city) {
    try {
      const locationURL = `/location?city=${city}`;
      const response = await axios.get(locationURL);
      const data = response.data;
      setLocation(data);
      await getWeather(data);
      await getMovies(data);
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

  async function getMovies(location) {
    try {
      const url = `/movies?city=${location.city}`; // Assuming the server API is set up to fetch movies based on the city
      const response = await axios.get(url);
      const data = response.data;
      setMovies(data);
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  }

  return (
    <>
      <WeatherSearch handleSearch={handleSearch} />
      <Weather weather={weather} />
      <Movies movies={movies} /> {/* Pass movie data to the Movies component */}
    </>
  );
}

export default App;
