
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import MovieLibrary from './components/MovieLibrary.js';
import MovieSearch from './components/MovieSearch.js';
import CustomerList from './components/CustomerList.js';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
     currentMovie: undefined,
    }
  }
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/search">Search Movies</Link>
              </li>
              <li>
                <Link to="/library">Movie Library</Link>
              </li>
              <li>
                <Link to="/customers">Customers</Link>
              </li>
            </ul>
          </nav>

        <p>This will always be here</p>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/customers">
              <CustomerList />
            </Route>
            <Route path="/library">
              <MovieLibrary />
            </Route>
            <Route path="/search">
              <MovieSearch />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    )};

}

export default App


function Home() {
  return <h2>Home</h2>;
}

