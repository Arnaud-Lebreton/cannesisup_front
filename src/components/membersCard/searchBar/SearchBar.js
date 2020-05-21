import React, { Component } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import "./searchBar.css";
import data from "../../fictivesdata/membershipData.json";

let nbMembers = data.length;
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
    e.preventDefault();
    const searchBar = e.target.value;
    this.setState((prevState) => {
      const filteredData = prevState.cardDeck.filter((element) => {
        return element.compagnyName
          .toLowerCase()
          .includes(searchBar.toLowerCase());
      });
      return { searchBar, filteredData };
    });
  };

  /******* Récupération des données depuis la base de données ********/
  extraction = () => {
    const options = {
      method: "GET",
      headers: { "content-type": "application/json" },
      mode: "cors",
    };
    fetch("http://localhost:8080/annuaire/all", options)
      .then((res) => res.json())
      .then(
        (data) => {
          this.setState({
            cardDeck: data,
          });
        },
        (error) => {
          console.log(error);
        }
      );
  };

  componentWillMount() {
    this.extraction();
  }

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
          <Button className="containtButtonSearchBar">
            >
            <img src="Images/Icones/search-solid.svg" />
          </Button>
        </Form>
        <div>
          {this.state.filteredData.map((i) => (
            <p>{i.compagnyName}</p>
          ))}
        </div>
        <p className="textMembers">{nbMembers} membres</p>
      </div>
    );
  }
}

export default SearchBar;
