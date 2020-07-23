import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log(res.data)
        setMovie(res.data)
      })
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const handleDelete = evt => {  
    evt.preventDefault();
    
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then(res => {
        push("/")
        setMovie(res.data);  
      })
      .catch(err =>{      
        console.log("who ohh something gone", err)
      })
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button className="update-button" onClick={() => push(`/update-movie/${params.id}`)}>Update Movie</button>
      <button className="update-button" onClick={handleDelete} >Delete Movie</button>
    </div>
  );
}

export default Movie;
