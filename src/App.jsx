import { useState } from 'react';
import { When } from 'react-if';

// Get access token from .env file
let accessToken = import.meta.env.VITE_LOCATION_ACCESS_TOKEN; // No one can see accessToken online
console.log("Access Token", accessToken);

function App() {
  // Initialize state variables
  const [city, setCity] = useState('');
  const [location, setLocation] = useState({});
  const [error, setError] = useState(null); // State to manage API call errors


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
    } catch (error) {
      console.error("Error getting location information", error);
      setError(error.message); // Set error message in state
    }

    // Log information
    console.log("Getting Location Information for", city, url);
  }

  // JSX return statement
  // form/search component, title component/ lat lon comp, map component
  // TODO: make separate pages for components
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

      <When condition={location.lat && location.lon}>
        <div className="mb-3">
          <img src={`https://maps.locationiq.com/v3/staticmap?key=${accessToken}&center=${location.lat},${location.lon}&size=500x440`} className="img-fluid" alt="Map" />
        </div>
      </When>
    </div>
  );
}

export default App;
