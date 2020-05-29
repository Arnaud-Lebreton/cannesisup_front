import React, { Component } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import "./login.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Redirect } from "react-router-dom";

class InitPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      redirect: false,
      icone_eye: "fas fa-eye-slash",
      icone_eye_confirm: "fas fa-eye-slash",
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
    } else if (password === confirmPassword) {
      this.updatePassword();
    }
  };

  /********* Fonction qui envoie la mise à jour du MDP ********/

  updatePassword = () => {
    const body = {
      membershipEmail: this.state.email,
      membershipHashPassword: this.state.password,
      superAdminEmail: this.state.email,
      superAdminHashPassword: this.state.password,
    };
    const options = {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      mode: "cors",
      body: JSON.stringify(body),
    };
    //Membre
    fetch("http://localhost:8080/profil/mdp", options)
      .then((res) => res.json())
      .then(
        (data) => {
          if (data.memberShipId.n === 1) {
            this.setState({ redirect: true });
            alert("Votre mot de passe membre a été modifié");
          }
        },
        (error) => {
          console.log(error);
        }
      );

    //Admin
    fetch("http://localhost:8080/profil/mdpAdmin", options)
      .then((res) => res.json())
      .then(
        (data) => {
          if (data.superAdminId.n === 1) {
            this.setState({ redirect: true });
            alert("Votre mot de passe admin a été modifié");
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  /********* Fonction Affiche/Cache le mot de passe ********/

  showPwd = () => {
    let x = document.getElementById("pwd");
    if (x.type === "password") {
      x.type = "text";
      this.setState({ icone_eye: "fas fa-eye" });
    } else {
      x.type = "password";
      this.setState({ icone_eye: "fas fa-eye-slash" });
    }
  };

  showPwdConfirm = () => {
    let x = document.getElementById("pwdConfirm");
    if (x.type === "password") {
      this.setState({ icone_eye_confirm: "fas fa-eye" });
      x.type = "text";
    } else {
      x.type = "password";
      this.setState({ icone_eye_confirm: "fas fa-eye-slash" });
    }
  };

  redirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
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
                <i
                  className={this.state.icone_eye}
                  style={{ color: "#f7316b" }}
                ></i>
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
                <i
                  className={this.state.icone_eye_confirm}
                  style={{ color: "#f7316b" }}
                ></i>
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
            {this.redirect()}
          </div>
        </Form>
      </div>
    );
  }
}

export default InitPassword;
