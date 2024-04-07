import React from 'react';

function Weather(props) {
  return (
    <>
      {props.forecastData && props.forecastData.map((day, index) => (
        <section key={index}>
          <h3>{day.date}</h3>
          <p>Forecast: {day.description}</p>
          <p>Low: {day.low}</p>
          <p>High: {day.high}</p>
        </section>
      ))}
    </>
  );
}
export default Weather;