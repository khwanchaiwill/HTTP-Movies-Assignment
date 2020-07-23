import React from 'react';
import { NavLink } from 'react-router-dom';

function SavedList({ list }) {
  return (
    <div className="saved-list">
      <h3>Saved Movies:</h3>
      {list.map(movie => {
        return (
          <NavLink
          className="save-movieItem"
            to={`/movies/${movie.id}`}
            key={movie.id}
            activeClassName="saved-active"
          >
            <span className="saved-movie">{movie.title}</span>
          </NavLink>
        );
      })}
      <div className="home-button">
        <NavLink className="home-link" to="/">Home</NavLink>
        <NavLink className="home-link" to="/add-movie">Add Movie</NavLink>
      </div>
    </div>
  );
}

export default SavedList;
