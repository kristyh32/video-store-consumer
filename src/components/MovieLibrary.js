import React, { Component } from 'react';

import axios from 'axios';
import Movie from './Movie';
class MovieLibrary extends Component {

  constructor(props) {
    super(props);

    this.state = {
     movies: [],
     error: ""
    }
  }

  componentDidMount() {
    axios.get('http://localhost:2999/movies')
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }
  

  render(){

  const movies = this.state.movies
  const movieComponents = movies.map((movie, i) => {
    return (
      <Movie key={i} { ...movie }
      // onSelectClick={ () => props.onSelectPet(pet.id) } 
      />
    );
  });

  return (
    <div>
      <p>
      {this.state.error}
      </p>
      <p>
      {movieComponents}
      </p>
    </div>
  )
  
}
  
}

export default MovieLibrary;