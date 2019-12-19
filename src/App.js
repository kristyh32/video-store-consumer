import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import MovieLibrary from "./components/MovieLibrary.js";
import MovieSearch from "./components/MovieSearch.js";
import CustomerList from "./components/CustomerList.js";
import Rental from "./components/Rental.js";
import axios from "axios";
import AlertMessage from "./components/AlertMessage";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMovie: undefined,
      selectedCustomer: undefined,
      activeItem: "home",
      isCheckoutSuccessful: false
    };
  }

  onSelectMovie = movie => {
    this.setState({ currentMovie: movie, isCheckoutSuccessful: false });
  };

  handleSelectedCustomer = customer => {
    this.setState({
      selectedCustomer: customer,
      isCheckoutSuccessful: false
    });
  };

  handleNavClick = item => {
    this.setState({
      activeItem: item
    });
  };

  checkoutMovieForCustomer = () => {
    const { currentMovie, selectedCustomer } = this.state;
    const movieTitle = currentMovie.title;
    const customerId = selectedCustomer.id;
    const url = `http://localhost:2999/rentals/${movieTitle}/check-out`;
    let due_date = new Date();
    due_date.setDate(new Date().getDate() + 7);
    console.log(due_date);

    const movieToRent = {
      customer_id: customerId,
      due_date: due_date
    };

    axios
      .post(url, movieToRent)
      .then(response => response.data)
      .then(data => {
        console.log(data);
        this.setState({
          isCheckoutSuccessful: true
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          error: error.message
        });
      });
  };
  render() {
    const {
      selectedCustomer,
      activeItem,
      isCheckoutSuccessful,
      currentMovie
    } = this.state;

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
              <li className={activeItem === "rental" ? "active" : ""}>
                <Link
                  to="/rentals"
                  className="nav-link"
                  onClick={() => this.handleNavClick("rental")}
                >
                  Rentals
                </Link>
              </li>
            </ul>
          </nav>

          {selectedCustomer && (
            <AlertMessage title="Selected Customer" type="info">
              <p>{selectedCustomer.name}</p>
            </AlertMessage>
          )}

          {currentMovie && (
            <AlertMessage title="Selected Movie" type="warning">
              <div className="d-flex">
                <div className="mr-auto">{currentMovie.title}</div>
                {selectedCustomer && currentMovie && (
                  <button
                    className="btn btn-danger justify-content-end"
                    onClick={this.checkoutMovieForCustomer}
                  >
                    Checkout
                  </button>
                )}
              </div>
            </AlertMessage>
          )}

          {isCheckoutSuccessful && (
            <AlertMessage title="Selected Customer" type="success">
              <p>Movie successfully checked out</p>
            </AlertMessage>
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
                <MovieLibrary onSelectMovie={this.onSelectMovie} />
              </Route>
              <Route path="/rentals">
                <Rental />
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
