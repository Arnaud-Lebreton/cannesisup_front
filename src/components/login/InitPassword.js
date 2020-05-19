import React, { Component } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import "./login.css";

class InitPassword extends Component {
  /********** Fonction contrôle du Mot de Passe **********/
  validate = () => {
    let message;
    let pass = document.getElementById("pwd").value;
    if (
      pass.length >= 8 /**** Longueur mini 8 caractères ****/ &&
      pass.match(/[0-9]/g) /**** Au moins 1 chiffre ****/ &&
      pass.match(/[A-Z]/g) /**** Au moins 1 majuscule ****/ &&
      pass.match(/[a-z]/g) /**** Au moins 1 miniscule ****/
    )
      message = "<p style='color:green'>Mot de passe fort</p>";
    else message = "<p style='color:red'>Mot de passe faible</p>";
    document.getElementById("msg").innerHTML = message;
  };

  render() {
    return (
      <div>
        <div className="containtLogoLogin">
          <img className="LogoLogin" src="Images/logo-icone.png" alt="logo" />
          <h1>
            <span>R</span>éinitialisation du<span>M</span>ot de<span>P</span>
            asse
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
              <Button
                className="containtButtonPassword" /*onClick={this.showPwd}*/
              >
                <img src="Images/Icones/eye-solid.svg" />
              </Button>
            </InputGroup.Append>
          </InputGroup>
          <p>Votre mot de passe doit contenir ces conditions:</p>
          <ul>
            <li>Minimum 8 caractères</li>
            <li>Au moins 1 majuscule</li>
            <li>Au moins 1 chiffre</li>
          </ul>

          <div className="containtButtonLogin">
            <Button
              className="buttonLogin"
              type="submit"
              onClick={this.validate()}
            >
              Confirmer
            </Button>
            <span id="msg"></span>
          </div>
        </Form>
      </div>
    );
  }
}

export default InitPassword;
