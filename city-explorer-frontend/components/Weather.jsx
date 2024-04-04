function Weather(props) {
  return (
    <>
      {props.forecastData.map((day, index) => (
        <section key={index}>
          <h3>{day.date}</h3>
          <p>Forecast: {day.forecast}</p>
          <p>Low: {day.low}</p>
          <p>High: {day.high}</p>
        </section>
      ))}
    </>
  );
}
