import React, { Component } from "react";
import { Form, Button, InputGroup, Nav } from "react-bootstrap";
import "./login.css";
import ForgotPassword from "./ForgotPassword";
import { Redirect } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

class TestLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardDeck: [],
      showForgotPassword: false,
      email: "",
      password: "",
      redirectAdmin: false,
      redirectMember: false,
    };
  }

  /********* Fonction qui récupère le champ input ********/

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  /********* Fonction qui permet de s'identifier ********/

  identify = (e) => {
    e.preventDefault();
    console.log("test");
    const body = {
      membershipEmail: this.state.email,
      membershipHashPassword: this.state.password,
      superAdminEmail: this.state.email,
      superAdminHashPassword: this.state.password,
    };

    const options = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      mode: "cors",
      body: JSON.stringify(body),
    };
    //Contrôle Admin
    fetch("http://localhost:8080/signIn/superAdmin", options)
      .then((res) => res.json())
      .catch((err) => console.log("pas admin"))
      .then(
        (data) => {
          console.log(data);
          let token = "bearer " + data.token;
          localStorage.setItem("token", token);
          localStorage.setItem("_id", data.superAdminId);

          if (data.token) {
            this.setState({ redirectAdmin: true });
            console.log("redirectAdmin");
            console.log(this.state.redirectAdmin);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    //Contrôle membre
    fetch("http://localhost:8080/signIn", options)
      .then((res) => res.json())
      .then(
        (data) => {
          console.log(data);
          let token = "bearer " + data.token;
          localStorage.setItem("token", token);
          localStorage.setItem("_id", data.membershipId);
          if (data.token) {
            this.setState({ redirectMember: true });
            console.log("redirectMember");
            console.log(this.state.redirectMember);
          }
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

  redirect = () => {
    if (this.state.redirectMember) {
      return <Redirect to="/profil" />;
    }
    if (this.state.redirectAdmin) {
      return <Redirect to="/dashboard" />;
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
        <Form className="containtLoginForm">
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
          <Button className="buttonLogin" onClick={this.identify}>
            S'Identifier
          </Button>
          {this.redirect()}
        </Form>
      </div>
    );
  }
}

export default TestLogin;
