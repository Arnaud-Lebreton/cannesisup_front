import React, { Component } from "react";
import { Form, FormControl } from "react-bootstrap";
import "./searchBar.css";
import data from "../../fictivesdata/membershipData.json";

let nbMembers = data.membershipData.length;

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBar: "",
      cardDeck: [],
      filteredData: [],
    };
  }

  /********* Fonction pour filtrer le contenu des membres ********/

  handleInput = (e) => {
    const searchBar = e.target.value;
    this.setState((prevState) => {
      const filteredData = prevState.cardDeck.filter((element) => {
        return element.name.toLowerCase().includes(searchBar.toLowerCase());
      });
      return { searchBar, filteredData };
    });
  };

  /*getData = () => {
    fetch("")
      .then((response) => response.json())
      .then((data) => {
        const { query } = this.state;
        const filteredData = data.filter((element) => {
          return element.name.toLowerCase().includes(query.toLowerCase());
        });

        this.setState({
          data,
          filteredData,
        });
      });
  };

  componentWillMount() {
    this.getData();
  }*/

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
            value={this.state.searchBar}
            onChange={this.handleInput}
          />
        </Form>
        <div>
          {this.state.filteredData.map((i) => (
            <p>{i.name}</p>
          ))}
        </div>
        <p className="textMembers">{nbMembers} membres</p>
      </div>
    );
  }
}

export default SearchBar;
