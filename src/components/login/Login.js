import React, { Component } from "react";
import { Form, Button, InputGroup, Nav } from "react-bootstrap";
import "./login.css";
import ForgotPassword from "./ForgotPassword";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardDeck: [],
      showForgotPassword: false,
      email: "",
      password: "",
    };
  }

  /********* Fonction qui récupère le champ input ********/

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  /********* Fonction qui permet de s'identifier ********/

  identify = (e) => {
    e.preventDefault();
    const body = {
      membershipEmail: this.state.email,
      membershipHashPassword: this.state.password,
    };
    console.log(body);
    const options = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      mode: "cors",
      body: JSON.stringify(body),
    };

    fetch("http://localhost:8080/signIn", options)
      .then((res) => res.json())
      .then(
        (data) => {
          console.log(data);
          let token = "bearer " + data.token;
          localStorage.setItem("token", token);
          localStorage.setItem("_id", data.membershipId);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  /********* Fonction qui change l'état de la Modal d'oubli de mot de passe ********/
  changeShow = () => {
    this.setState({ showForgotPassword: true });
  };

  /********* Fonction Affiche/Cache le mot de passe ********/

  showPwd = () => {
    let x = document.getElementById("pwd");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  render() {
    return (
      <div className="containtLogin">
        <div className="containtLogoLogin">
          <img className="LogoLogin" src="Images/logo-icone.png" alt="logo" />
          <h1>
            <span>B</span>ienvenue sur votre <span>E</span>space <span>A</span>
            dhérent
          </h1>
        </div>
        <Form className="containtLoginForm" onSubmit={this.identify}>
          <Form.Group className="containtGroupForm">
            <Form.Control
              className="containtInputForm"
              type="email"
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInput}
              placeholder="Votre Email..."
            />
          </Form.Group>
          <InputGroup
            className="containtGroupForm"
            controlId="formBasicPassword"
          >
            <Form.Control
              className="containtInputForm"
              id="pwd"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleInput}
              placeholder="Votre Mot de Passe..."
            />
            <InputGroup.Append>
              <Button className="containtButtonPassword" onClick={this.showPwd}>
                <i className="fas fa-eye" style={{ color: "#f7316b" }}></i>
              </Button>
            </InputGroup.Append>
          </InputGroup>
          <Nav className="resetPassword" onClick={this.changeShow}>
            <ForgotPassword />
          </Nav>
          <Link to={"profil"} className="containtButtonLogin">
            <Button className="buttonLogin">S'Identifier</Button>
          </Link>
        </Form>
      </div>
    );
  }
}

export default Login;
