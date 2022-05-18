import React from 'react';
import './Header.scss';

import { useState } from 'react';
export default function Header({ searchMovie }) {
  const [movieName, setMovieName] = useState('');
  const movieNameHandler = (e) => {
    setMovieName(e.target.value);
  };
  return (
    <div>
      <header>
        <div className="header-content">
          <h1>React Movie App</h1>
          <form onClick={(e) => e.preventDefault()} action="submit">
            <input
              onChange={(e) => movieNameHandler(e)}
              type="text"
              placeholder="search"
            />
            <button onClick={() => searchMovie(movieName)}>Search</button>
          </form>
        </div>
      </header>
    </div>
  );
}
