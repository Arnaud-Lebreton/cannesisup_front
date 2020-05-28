import React, { Component } from "react";
import { Container, Image, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
//Import css
import "./dashboardStyle.css";

class Graphe extends Component {
  fileHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    //Configuration de la requete
    const options = {
      method: "POST",
      //headers: {}, // { "Content-Type": "application/json" },
      mode: "cors",
      body: formData, //JSON.stringify(body),
    };

    //Envoie de la requete
    fetch("http://localhost:8080/testMulter", options)
      .then((response) => response.json())
      .then(
        (data) => {
          alert("Votre message a été pris en compte, merci");
        },
        (error) => {
          console.log(error);
        }
      );
  };

  render() {
    return (
      <div>
        <form onSubmit={this.fileHandler} className="dashboardPaginationRow">
          <input type="text" name="superAdminEmail" placeholder="mail" />
          <input type="text" name="superAdminHashPassword" placeholder="mdp" />
          <input type="file" name="image" />
          <button type="submit">Envoyer</button>
        </form>
      </div>
    );
  }
}

export default Graphe;
