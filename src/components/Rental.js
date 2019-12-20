import React, { Component } from "react";
import axios from "axios";
import AlertMessage from "./AlertMessage";
import "../App.css"

class Rentals extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rentals: [],
      error: ""
    };
  }

  componentDidMount() {
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
    const movieTitle = rental.movie.title;
    const customer_id = rental.customer.id;
    const url = `http://localhost:2999/rentals/${movieTitle}/return`;
    const toReturn = {
      customer_id: customer_id
    };

    axios
      .post(url, toReturn)
      .then(() => {
        axios
        .get("http://localhost:2999/rentals")
        .then(response => {
          const rentals = response.data;
          this.setState({ rentals });
        })
        .catch(error => {
          this.setState({ error: error.message });
        });
      })
      .catch(error => {
        this.setState({
          error: error.message
        });
      });
  }

  

  render() {
    const { rentals } = this.state;
    const today = new Date()
    return (
      <div>
        <h1></h1>
        {this.state.error && (<AlertMessage title={this.state.error} type="warning" />)}

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
                  <td className={new Date(due_date) < today ? "Overdue" : ""}>{due_date}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => this.checkIn(rental)}
                    >
                      Check In
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          {/* {className={ ? "Overdue" : ""}} */}
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
