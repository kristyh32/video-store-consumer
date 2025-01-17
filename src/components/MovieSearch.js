import React, { Component } from "react";
import axios from "axios";
import Movie from "./Movie";

class MovieSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      movies: [],
      error: "",
      loading: false
    };
  }

  handleInput = event => {
    const value = event.target.value;
    this.setState({
      title: value
    });
    // this.getMovie();
  };

  handleSubmit = event => {
    event.preventDefault();
    this.getMovie();
  };

  getMovie() {
    const { title } = this.state;
    this.setState({
      loading: true
    });
    axios
      .get(`http://localhost:2999/movies`, { params: { query: title } })
      .then(response => response.data)
      .then(data => {
        console.log(data);
        this.setState({
          movies: data,
          loading: false,
          error: ""
        });
      })
      .catch(error => {
        console.log(error.message);
        this.setState({
          error: error.message,
          movies: [],
          loading: false
        });
      });
  }

  addMovie(movie) {
    console.log(movie)
    axios.post(`http://localhost:2999/movies`, movie)
      .then(() => {
        this.setState({
          // movies: data,
          loading: false,
          error: ""
        });
        // <Redirect to="/library" />;
      })
      .catch(error => {
        // console.log(error.message);
        this.setState({
          error: error.message
        });
      });
  }

  render() {
    const { title, movies, error, loading } = this.state;
    const movieCompoenents = movies.map((movie, i) => {
      return (
        
          <Movie
            key={i}
            {...movie}
            showSelect={true}
            movieSearch={true}
            onSelectClick={() => this.addMovie(movie)}
          />
  
      );
    });
    return (
      <div className="container">
        <h2 class="  text-muted mt-3">MovieSearch</h2>
        <form onSubmit={this.handleSubmit} className="mb-5">
          <div className="form-group">
            <input
              className="form-control"
              id="title"
              type="text"
              name="movie"
              placeholder="Search movie by title"
              value={title}
              onChange={this.handleInput}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Search
          </button>
        </form>
        {loading && (
          <div
            className="spinner-border"
            role="status"
            style={{ width: "6rem", height: "6rem" }}
          ></div>
        )}
        {movies && <div className="row">
          {movieCompoenents}
          </div>}
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default MovieSearch;
