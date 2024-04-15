import React from 'react';

function Weather({ forecastData }) {
  return (
    <>
      {forecastData && forecastData.map((day, index) => (
        <section key={index}>
          <h3>{day.valid_date}</h3> {/* Changed from day.date */}
          <p>Forecast: {day.weather.description}</p> {/* Assuming nested structure */}
          <p>Low: {day.low_temp}</p> {/* Changed from day.low */}
          <p>High: {day.high_temp}</p> {/* Changed from day.high */}
        </section>
      ))}
    </>
  );
}

export default Weather;
