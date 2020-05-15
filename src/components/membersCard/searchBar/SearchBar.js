import React, { Component } from "react";
import { Form, FormControl } from "react-bootstrap";
import "./searchBar.css";

class SearchBar extends Component {
  render() {
    return (
      <div className="containtSearchBar">
        <div className="containerImage">
          <h1 className="containtTitle">annuaire des membres</h1>
        </div>

        <Form className="containtForm">
          <FormControl
            type="search"
            placeholder="Recherchez : un membre, une activité, un mot clé..."
            className="form"
          />
        </Form>

        <p className="textMembers">xxx membres</p>
      </div>
    );
  }
}

export default SearchBar;
