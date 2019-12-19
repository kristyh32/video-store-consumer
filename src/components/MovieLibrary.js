import React, { Component } from "react";

import axios from "axios";
import PropTypes from "prop-types";
import Movie from "./Movie";
class MovieLibrary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      error: ""
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:2999/movies")
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  }

  render() {
    const movies = this.state.movies;
    const movieComponents = movies.map((movie, i) => {
      return (
        <Movie
          key={i}
          {...movie}
          showSelect={true}
          onSelectClick={() => this.props.onSelectMovie(movie)}
        />
      );
    });

    return (
      <div>
        <p>{this.state.error}</p>
        <div className="row">{movieComponents}</div>
      </div>
    );
  }
}

MovieLibrary.propTypes = {
  onSelectMovie: PropTypes.func
};

export default MovieLibrary;
