import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import MovieLibrary from "./components/MovieLibrary.js";
import MovieSearch from "./components/MovieSearch.js";
import CustomerList from "./components/CustomerList.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
     currentMovie: undefined,
     selectedCustomer: undefined,
    activeItem: "home"
    }
  }

  onSelectMovie = (movie) => {
    this.setState({currentMovie: movie});
  }

  handleSelectedCustomer = customer => {
    this.setState({
      selectedCustomer: customer
    });
  };

  handleNavClick = item => {
    this.setState({
      activeItem: item
    });
  };

  render() {
    const { selectedCustomer, activeItem, currentMovie } = this.state;
    
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <ul className="navbar-nav">
              <li
                className={activeItem === "home" ? "active" : ""}
                onClick={() => this.handleNavClick("home")}
              >
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className={activeItem === "search" ? "active" : ""}>
                <Link
                  to="/search"
                  className="nav-link"
                  onClick={() => this.handleNavClick("search")}
                >
                  Search Movies
                </Link>
              </li>
              <li className={activeItem === "movie" ? "active" : ""}>
                <Link
                  to="/library"
                  className="nav-link"
                  onClick={() => this.handleNavClick("movie")}
                >
                  Movie Library
                </Link>
              </li>
              <li className={activeItem === "customer" ? "active" : ""}>
                <Link
                  to="/customers"
                  className="nav-link"
                  onClick={() => this.handleNavClick("customer")}
                >
                  Customers
                </Link>
              </li>
            </ul>
          </nav>


          {selectedCustomer && (
            <div className="alert alert-info">
              <h3>Selected Customer</h3>
              {selectedCustomer.name}
            </div>
          )}

          {currentMovie && (
            <div className="alert alert-info">
              <h3>Selected Movie</h3>
              {currentMovie.title}
            </div>
          )}

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <main className="container">
            <Switch>
              <Route path="/customers">
                <CustomerList
                  handleSelectedCustomer={this.handleSelectedCustomer}
                  // customer={100}
                />
              </Route>
              <Route path="/library">
                <MovieLibrary onSelectMovie={this.onSelectMovie}/>
              </Route>
              <Route path="/search">
                <MovieSearch />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
