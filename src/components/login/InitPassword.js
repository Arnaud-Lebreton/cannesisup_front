import React, { Component } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import "./login.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

class InitPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
    };
    this.submitData = this.submitData.bind(this);
  }

  /********* Fonction qui récupère le champ input ********/

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  /********* Fonction qui vérifie la concordance des 2 MDP ********/

  submitData = (e) => {
    e.preventDefault();
    const { password, confirmPassword } = this.state;
    if (password === "" || confirmPassword === "") {
      alert("Le champ mot de passe est vide");
    } else if (password !== confirmPassword) {
      alert("Les mots de passe saisis ne correspondent pas");
    } else if (password === confirmPassword)
      alert("Votre mot de passe a été modifié");
  };

  /********* Fonction qui envoie la mise à jour du MDP ********/

  /*updatePassword = (e) => {
    e.preventDefault();
    const body = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };
    const options = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      mode: "cors",
      body: JSON.stringify(body),
    };

    fetch("", options)
      .then((res) => res.json())
      .then(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
  };
*/
  /********* Fonction Affiche/Cache le mot de passe ********/

  showPwd = () => {
    let x = document.getElementById("pwd");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  showPwdConfirm = () => {
    let x = document.getElementById("pwdConfirm");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  render() {
    return (
      <div className="containtInitPassword">
        <div className="containtLogoLogin">
          <img className="LogoLogin" src="Images/logo-icone.png" alt="logo" />
          <h1>
            <span>R</span>éinitialisation du <br />
            <span>M</span>ot de <span>P</span>
            asse
          </h1>
        </div>
        <Form className="containtLoginForm" onSubmit={this.submitData}>
          <Form.Group className="containtGroupForm" controlId="formBasicEmail">
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
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            />
            <InputGroup.Append>
              <Button className="containtButtonPassword" onClick={this.showPwd}>
                <i className="fas fa-eye" style={{ color: "#f7316b" }}></i>
              </Button>
            </InputGroup.Append>
          </InputGroup>
          <InputGroup
            className="containtGroupForm"
            controlId="formBasicPassword"
          >
            <Form.Control
              className="containtInputForm"
              id="pwdConfirm"
              name="confirmPassword"
              type="password"
              value={this.state.confirmPassword}
              onChange={this.handleInput}
              placeholder="Confirmation Mot de Passe..."
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            />
            <InputGroup.Append>
              <Button
                className="containtButtonPassword"
                onClick={this.showPwdConfirm}
              >
                <i className="fas fa-eye" style={{ color: "#f7316b" }}></i>
              </Button>
            </InputGroup.Append>
          </InputGroup>
          <div className="conditionTextPassword">
            <p>Votre mot de passe doit contenir ces conditions:</p>
            <ul>
              <li>Minimum 8 caractères</li>
              <li>Au moins 1 majuscule</li>
              <li>Au moins 1 chiffre</li>
            </ul>
          </div>

          <div className="containtButtonLogin">
            <Button className="buttonLogin" type="submit">
              Confirmer
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default InitPassword;
