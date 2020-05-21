import React, { Component } from "react";
import { Form, FormControl } from "react-bootstrap";
import "./searchBar.css";
import data from "../../fictivesdata/membershipData.json";

//let nbMembers = data.membershipData.length;
let nbMembers = data.length;
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

        <p className="textMembers">{nbMembers} membres</p>
      </div>
    );
  }
}

export default SearchBar;
