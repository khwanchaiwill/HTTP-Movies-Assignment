import React, { useState, useEffect } from 'react'
import { useLocation, useParams, useHistory } from 'react-router-dom'
import axios from 'axios';


const initialValue = {
    director: "",
    metascore: "",
    stars: [""],
    title: ""
   
}

const UpdateMovie = props => {
    const [update, setUpdate] = useState(initialValue)
    console.log(props)
    // const location = useLocation();
    const params = useParams();
    const { push } = useHistory();
    
    useEffect(() => {
            axios
            .get(`http://localhost:5000/api/movies/${params.id}`)
            .then(res => {
                console.log(res.data)
                setUpdate(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        
    }, []);

  const handleChange = evt =>{
      evt.persist();
      let value = evt.target.value 
      if(evt.target.name === "stars"){
          value = value.split(",")
      }
        setUpdate({
            ...update,
            [evt.target.name]: value
        })
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${update.id}`, update)
            .then(res => {
                console.log(res)
                setUpdate(res.data)
               push(`/`);
            })
            .catch(err => {
                console.log(err)
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
                    value={update.director}
                    onChange={handleChange}
                />
                <label>Metascore: &nbsp; </label>
                <input 
                    type="text"
                    name="metascore"
                    value={update.metascore}
                    onChange={handleChange}
                />
                <label>Title: &nbsp; </label>
                <input 
                    type="text"
                    name="title"
                    value={update.title}
                    onChange={handleChange}
                />
                <label>Director: &nbsp; </label>
                <input 
                    type="text"
                    name="stars"
                    value={update.stars}
                    onChange={handleChange}
                />
                <button>Update</button>
            </form>
        </div>
    )
}
export default UpdateMovie;