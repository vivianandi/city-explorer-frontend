import React from 'react';

function Movies({ movies }) {
  return (
    <div>
      <h2>Movies</h2>
      <ul>
        {movies.map((movie, index) => (
          <li key={index}>
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
            <p>Rating: {movie.average_votes}</p>
            <p>Released on: {movie.released_on}</p>
            <img src={movie.image_url} alt={movie.title} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Movies;
