import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const initialValue = {
    id: Date.now(),
    title: "",
    director: "",
    metascore: "",
    stars: [], 
}

const AddMovieform = () => {
    const [addMovie, setAddMovie] = useState(initialValue)
    const { push } = useHistory()

    const handleChange = evt => {
        evt.persist();
        let value = evt.target.value
        if(evt.target.name === "stars"){
            value = value.split(",")
        }
        setAddMovie({
            ...addMovie,
            [evt.target.name]: evt.target.value
        })
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        axios 
            .post("http://localhost:5000/api/movies", addMovie)
            .then(res => {
                console.log(res.data)
                setAddMovie(res.data)
                push('/')
            })
            .catch(err => {
                console.log("You come the wrong path with error", err)
            })
    }

    return(
        <div>
            <h3>Update Movies</h3>
            <form onSubmit={handleSubmit}>
                <label>Director: &nbsp; </label>
                <input 
                    type="text"
                    name="director"
                    value={addMovie.director}
                    onChange={handleChange}
                />
                <label>Metascore: &nbsp; </label>
                <input 
                    type="text"
                    name="metascore"
                    value={addMovie.metascore}
                    onChange={handleChange}
                />
                <label>Title: &nbsp; </label>
                <input 
                    type="text"
                    name="title"
                    value={addMovie.title}
                    onChange={handleChange}
                />
                <label>Director: &nbsp; </label>
                <input 
                    type="text"
                    name="stars"
                    value={addMovie.stars}
                    onChange={handleChange}
                />
                <button>Add</button>
            </form>
        </div>
    )
}
export default AddMovieform;