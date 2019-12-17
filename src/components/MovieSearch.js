import React, { Component } from "react";
import axios from "axios";
import Movie from "./Movie";

class MovieSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      movie: "",
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
    axios.get(`http://localhost:2999//movies/`, { params: { query: title } });
      .then(response => response.data)
      .then(data => {
        console.log(data);
        this.setState({
          movie: data[0],
          loading: false,
          error: ""
        });
      })
      .catch(error => {
        console.log(error.message);
        this.setState({
          error: error.message,
          movie: "",
          loading: false
        });
      });
  }

  render() {
    const { title, movie, error, loading } = this.state;
    return (
      <div className="container">
        <h2>MovieSearch</h2>
        <form onSubmit={this.handleSubmit} className="mb-5">
          <div className="form-group">
            <label htmlFor="title">Search Title</label>
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
          <button type="submit" className="btn btn-primary">
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

        {movie && <Movie {...movie} />}

        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default MovieSearch;
