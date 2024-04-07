import { useState } from 'react';
import { When } from 'react-if';
import Weather from './components/Weather'; // Import Weather component

// Get access token from .env file
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
const accessToken = process.env.VITE_LOCATION_ACCESS_TOKEN;
console.log("Access Token", accessToken);

function App() {
  // Initialize state variables
  const [city, setCity] = useState('');
  const [location, setLocation] = useState({});
  const [error, setError] = useState(null); // State to manage API call errors
  const [weatherData, setWeatherData] = useState(null); // State to store weather data

  // Handle input change
  function handleNewCity(e) {
    setCity(e.target.value);
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    getLocation();
  }

  // Fetch location data from API
  async function getLocation() {
    // Construct API URL
    let url = `https://us1.locationiq.com/v1/search?key=${accessToken}&q=${city}&format=json&`;
    try {
      // Fetch data from API
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch location data: ${response.status} - ${response.statusText}`);
      }
      let jsonData = await response.json();
      let locationData = jsonData[0];
      // Update location state
      setLocation(locationData);
      setError(null); // Clear any previous errors

      // If location data is fetched successfully, fetch weather data
      if (locationData.lat && locationData.lon) {
        fetchWeatherData(locationData.lat, locationData.lon);
      }
    } catch (error) {
      console.error("Error getting location information", error);
      setError(error.message); // Set error message in state
    }

    // Log information
    console.log("Getting Location Information for", city, url);
  }

  // Fetch weather data from API
  async function fetchWeatherData(lat, lon) {
    // Construct API URL for weather endpoint
    let weatherUrl = `/weather?lat=${lat}&lon=${lon}`;
    try {
      // Fetch weather data from server
      let response = await fetch(weatherUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.status} - ${response.statusText}`);
      }
      let weatherJson = await response.json();
      setWeatherData(weatherJson);
    } catch (error) {
      console.error("Error fetching weather data", error);
      // You can handle error states here if necessary
    }

    // Log information
    console.log("Getting Weather Information for", lat, lon, weatherUrl);
  }

  return (
    <div className="container mt-5">
      {/* Bootstrap Alert component to display error message */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-3">
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Enter a city" onChange={handleNewCity} />
          <button type="submit" className="btn btn-primary">Explore</button>
        </div>
      </form>

      {location.display_name && (
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">Location Information</h5>
            <p className="card-text"><strong>City:</strong> {location.display_name}</p>
            <p className="card-text"><strong>Latitude:</strong> {location.lat}</p>
            <p className="card-text"><strong>Longitude:</strong> {location.lon}</p>
          </div>
        </div>
      )}

      {/* Display Weather Component with weatherData */}
      <When condition={weatherData}>
        <Weather forecastData={weatherData} />
      </When>
    </div>
  );
}

export default App;
