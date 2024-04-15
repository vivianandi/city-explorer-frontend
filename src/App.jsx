import React, { useState } from 'react';
import axios from 'axios';
import { When } from 'react-if';
import Weather from './components/Weather'; // Import Weather component

// Get access token and API keys from .env file
const API = import.meta.env.VITE_API_URL;
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const MOVIE_API_KEY = import.meta.env.VITE_MOVIE_API_KEY;
const accessToken = import.meta.env.VITE_LOCATION_ACCESS_TOKEN;

function App() {
  const [city, setCity] = useState('');
  const [location, setLocation] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  const handleNewCity = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city) {
      setError('Please enter a city name.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const locationData = await getLocation(city);
      setLocation(locationData);
      if (locationData.latitude && locationData.longitude) {
        const weather = await getWeather(locationData.latitude, locationData.longitude);
        setWeatherData(weather);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getLocation = async (city) => {
    const locationUrl = `https://us1.locationiq.com/v1/search.php?key=${accessToken}&q=${city}&format=json`;
    const response = await axios.get(locationUrl);
    if (!response.data || response.data.length === 0) {
      throw new Error('Location not found');
    }
    return {
      name: response.data[0].display_name,
      latitude: response.data[0].lat,
      longitude: response.data[0].lon
    };
  };

  const getWeather = async (lat, lon) => {
    const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}&days=5&units=I`;
    const response = await axios.get(weatherUrl);
    return response.data.data;
  };

  return (
    <div className="container mt-5">
      {loading && <div>Loading...</div>}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Enter a city" onChange={handleNewCity} />
          <button type="submit" className="btn btn-primary">Explore</button>
        </div>
      </form>
      {location.name && (
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">Location Information</h5>
            <p className="card-text"><strong>City:</strong> {location.name}</p>
            <p className="card-text"><strong>Latitude:</strong> {location.latitude}</p>
            <p className="card-text"><strong>Longitude:</strong> {location.longitude}</p>
          </div>
        </div>
      )}
      <When condition={location.latitude && location.longitude}>
        <div className="mb-3">
          <img src={`https://maps.locationiq.com/v3/staticmap?key=${accessToken}&center=${location.latitude},${location.longitude}&size=500x440`} className="img-fluid" alt="Map" />
        </div>
      </When>
      <When condition={weatherData}>
        <Weather forecastData={weatherData} />
      </When>
    </div>
  );
}

export default App;
