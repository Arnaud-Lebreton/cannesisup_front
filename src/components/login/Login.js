import React, { Component } from "react";
import { Form, Button, InputGroup, Nav } from "react-bootstrap";
import "./login.css";
import ForgotPassword from "./ForgotPassword";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForgotPassword: false,
    };
  }

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
      <div>
        <div className="containtLogoLogin">
          <img className="LogoLogin" src="Images/logo-icone.png" alt="logo" />
          <h1>
            <span>B</span>ienvenue sur votre <span>E</span>space <span>A</span>
            dhérent
          </h1>
        </div>
        <Form className="containtLoginForm">
          <Form.Group className="containtGroupForm" controlId="formBasicEmail">
            <Form.Control
              className="containtInputForm"
              type="email"
              id="email"
              name="email"
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
              placeholder="Votre Mot de Passe..."
            />
            <InputGroup.Append>
              <Button className="containtButtonPassword" onClick={this.showPwd}>
                <img src="Images/Icones/eye-solid.svg" />
              </Button>
            </InputGroup.Append>
          </InputGroup>
          <Nav className="resetPassword" onClick={this.changeShow}>
            <ForgotPassword />
          </Nav>

          <div className="containtButtonLogin">
            <Button className="buttonLogin" type="submit">
              S'Identifier
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default Login;
