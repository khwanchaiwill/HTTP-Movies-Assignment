import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';



const initialValue = {
    id: Date.now(),
    title: "",
    director: "",
    metascore: "",
    stars: []
}

const AddMovieform = () => {
    const [newMovie, setNewMovie] = useState(initialValue)
    const { push } = useHistory();

    const handleChange = evt => {
        evt.persist()
        let value = evt.target.value
        if(evt.target.name === "stars"){
           value = value.split([','])
        }
             setNewMovie({      
            ...newMovie, 
            [evt.target.name]: value,    
        })
    }

    const handleSubmit = evt => {
        
        evt.preventDefault();
        axios 
            .post("http://localhost:5000/api/movies", newMovie)
            .then(res => {
                console.log(res.data)
                setNewMovie(res.data)
                push('/')
                window.location.reload(false)
            })
            .catch(err => {
                console.log("You come the wrong path with error", err)
            })
    }
   

    return(
        <div className="add-movie">
            <h1>Update Movies</h1>
            <form 
                className="add-form"
                onSubmit={handleSubmit}>
                <label>Director: &nbsp; </label>
                <input 
                    type="text"
                    name="director"
                    value={newMovie.director}
                    onChange={handleChange}
                />
                <label>Metascore: &nbsp; </label>
                <input 
                    type="text"
                    name="metascore"
                    value={newMovie.metascore}
                    onChange={handleChange}
                />  
                <label>Actors: &nbsp; </label>
                <input 
                    type="text"
                    name="stars"
                    value={newMovie.type}
                    onChange={handleChange}
                />
                <label>Title: &nbsp; </label>
                <input 
                    type="text"
                    name="title"
                    value={newMovie.name}
                    onChange={handleChange}
                />
              
                <button className="add-btn">Add</button>
            </form>
        </div>
    )
}
export default AddMovieform;