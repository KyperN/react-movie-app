import React from 'react';

export default function Movie({ movie, trailerHandle }) {
  const { title, vote_average, poster_path, id, name } = movie;

  return (
    <div className="movie">
      <div onClick={() => trailerHandle(id)} className="movie-img">
        <img
          src={
            poster_path === undefined
              ? ''
              : `https://image.tmdb.org/t/p/w500${poster_path}`
          }
          alt=""
        />
        <div className="movie-darkened"></div>
      </div>
      <div className="movie-rating">{vote_average}</div>
      <div className="movie-name">{title === undefined ? name : title}</div>
      <div className="movie-category">genre</div>
    </div>
  );
}
