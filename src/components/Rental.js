import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";

class Rentals extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rentals: [],
      overdue: [],
      error: ""
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:2999/rentals/overdue")
      .then(response => {
        console.log(response.data);
        const overdue = response.data;
        this.setState({ overdue });
      })

      .catch(error => {
        this.setState({ error: error.message });
      });

    axios
      .get("http://localhost:2999/rentals")
      .then(response => {
        console.log(response.data);
        const rentals = response.data;
        this.setState({ rentals });
      })

      .catch(error => {
        this.setState({ error: error.message });
      });
  }

  checkIn = rental => {

  }

  



  render() {
    const { overdue, rentals } = this.state;
    return (
      <div>
        {/* <h1>Overdue Rentals</h1>

        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>Movie</th>
              <th>Customer</th>
              <th>Due Date</th>
              <th>Check In</th>
            </tr>
          </thead>
          <tbody>
            {overdue.map(rental => {
              const { title, name, due_date } = rental;
              return (
                <tr>
                  <td>{title} </td>
                  <td>{name}</td>
                  <td>{due_date}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      // onClick={() => this.handleClick(customer)}
                    >
                      Check In
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table> */}

        <h1>Rentals</h1>

        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>Movie</th>
              <th>Customer</th>
              <th>Due Date</th>
              <th>Check In</th>
            </tr>
          </thead>
          <tbody>
            {rentals.map(rental => {
              const { movie, customer, due_date } = rental;
              return (
                <tr>
                  <td>{movie.title} </td>
                  <td>{customer.name}</td>
                  <td>{due_date}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      // onClick={() => this.handleClick(customer)}
                    >
                      Check In
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      
      
    );
  }

}
// Rentals.propTypes = {
//   // handleSelectedCustomer: PropTypes.func.isRequired
//   // customer: PropTypes.number.isRequired
// };

export default Rentals;
