import React, { Component } from "react";
import { Container, Image, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
//Import css
import "./dashboardStyle.css";

class Graphe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };
  }
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
  changeImage = (e) => {
    let chemin = e.target.value;
  };

  preview_image = (e) => {
    console.log("test");
    let reader = new FileReader();
    reader.onload = () => {
      let output = document.getElementById("output_image");
      output.src = reader.result;
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.fileHandler} className="dashboardPaginationRow">
          <input type="text" name="superAdminEmail" placeholder="mail" />
          <input type="text" name="superAdminHashPassword" placeholder="mdp" />
          <input type="file" accept="image/*" onChange={this.preview_image} />
          <img style={{ maxWidth: 300 }} id="output_image" />
          <button type="submit">Envoyer</button>
        </form>
      </div>
    );
  }
}

export default Graphe;
