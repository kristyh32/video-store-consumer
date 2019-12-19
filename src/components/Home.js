import React from "react";
import PropTypes from "prop-types";
import Movie from "./Movie";
import axios from "axios";
import * as _ from "lodash";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      randomMovies: []
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:2999/movies")
      .then(response => {
        // get only 12 random movies

        const topTenMovies = _.sampleSize(response.data, 12);
        this.setState({
          randomMovies: topTenMovies
        });
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  }
  render() {
    const { randomMovies } = this.state;

    return (
      <div>
        <h1 class="row justify-content-center  text-muted mt-3">
          Welcome to Kristy and Sara's Video Store
        </h1>

        <div className="row">
          {randomMovies.length &&
            randomMovies.map((movie, index) => (
              <Movie {...movie} index={index} showSelect={false} />
            ))}
        </div>
      </div>
    );
  }
}

export default Home;
