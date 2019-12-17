import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";

class CustomerList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
      error: ""
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3000/customers")
      .then(response => {
        console.log(response.data);
        const customers = response.data;
        this.setState({ customers });
      })

      .catch(error => {
        this.setState({ error: error.message });
      });
  }

  handleClick = customer => {
    console.log(customer);
    this.props.handleSelectedCustomer(customer);
  };

  render() {
    const { customers } = this.state;
    console.log(customers);
    return (
      <div>
        {/* {this.props.customer * 100} */}
        <h2>CustomerList</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Address</th>
              <th>City</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => {
              const { id, name, address, city } = customer;
              return (
                <tr key={id}>
                  <td>{id} </td>
                  <td>{name}</td>
                  <td>{address}</td>
                  <td>{city}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => this.handleClick(customer)}
                    >
                      Select
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

CustomerList.propTypes = {
  handleSelectedCustomer: PropTypes.func.isRequired
  // customer: PropTypes.number.isRequired
};

export default CustomerList;
