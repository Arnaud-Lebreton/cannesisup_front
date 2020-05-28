import React, { Component } from "react";
import "./formulaire.css";
import { Row, Col, Container, Button, Accordion, Card } from "react-bootstrap";
import { Redirect } from "react-router-dom";

class inscrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Nom: "",
      Prenom: "",
      Nom_Societe: "",
      Description_Societe: "",
      Activité_Societe: "",
      Adresse_Societe: "",
      Site_web_Societe: "",
      Email_Societe: "",
      Telephone: "",
      membershipEmail: "",
      work: "",
      work_description: "",
      isShow: true,
      image_profil: "",
      image_fond: "",
      image_logo: "",
      facebook: "",
      twitter: "",
      linkedin: "",
      redirect: false,
      icone_eye: "fas fa-eye-slash",
    };
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

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

  /********* Fonction qui change l'état de la Modal d'oubli de mot de passe ********/
  changeShow = () => {
    this.setState({ showForgotPassword: true });
  };

  dataHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);

    //Configuration de la requete
    const options = {
      method: "POST",
      mode: "cors",
      body: formData, //JSON.stringify(body),
    };

    //Envoie de la requete inscription
    fetch("http://localhost:8080/profil/insertSingle", options)
      .then((response) => response.json())
      .then(
        (data) => {
          alert("Votre demande a bien été prise en compte !");
        },
        (error) => {
          console.log(error);
        }
      );

    const bodyMail = {
      membershipEmail: this.state.membershipEmail,
    };
    console.log(bodyMail);
    const optionMail = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(bodyMail),
    };
    //Envoie de la requete
    fetch("http://localhost:8080/mail/subscribe", optionMail)
      .then((response) => response.json())
      .then(
        (data) => {},
        (error) => {
          console.log(error);
        }
      );
  };

  redirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/inscription" />;
    }
  };

  preview_image = (e) => {
    let image = e.target.name;
    let reader = new FileReader();
    reader.onload = () => {
      let output = document.getElementById(image);
      output.src = reader.result;
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  render() {
    return (
      <div id="formulaire">
        <div
          id="bande"
          style={{ backgroundImage: "url(" + "Images/fond_contact.jpg" + ")" }}
        >
          <h1 id="textInscription">Contact & Adhésion</h1>
        </div>
        <Container className="containerFormulaire">
          <Row className="containtRowFormulaire">
            <Col className="containtColImage">
              <img
                src="Images/logo-french-tech-cote-dazur.png"
                alt="image logo"
              />
            </Col>
            <Col className="containtColText">
              <h3>Comment adhérer ?</h3>
              <h4>
                Vous représentez ou travaillez dans une entreprise innovante
                et/ou créative du bassin Cannois ? <br />
                Rejoignez-nous !
              </h4>
              <ol>
                <li>
                  Remplissez notre formulaire d’adhésion en ligne ci-dessous
                </li>
                <li>
                  Une fois réceptionnée, notre équipe transmet votre candidature
                  au Conseil d’Administration pour approbation.
                </li>
              </ol>
            </Col>
          </Row>
        </Container>
        <form className="containtFormulaire" onSubmit={this.dataHandler}>
          <div>
            <div className="containtInformationTitle">
              <h3>Informations de Connexion</h3>
            </div>
            <div className="containtField">
              <label>Email</label>
              <input
                type="email"
                name="membershipEmail"
                placeholder="Email de connexion..."
                onChange={this.handleInput}
                required
              />
            </div>
            <div className="containtField">
              <label>Mot de passe</label>
              <input
                id="pwd"
                type="password"
                placeholder="Mot de passe..."
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                required
              />
              <i
                className={this.state.icone_eye}
                style={{
                  color: "#f7316b",
                  cursor: "pointer",
                  marginLeft: "-25px",
                }}
                onClick={this.showPwd}
              ></i>
              <p>Min. 8 caractères, 1 Majuscule et 1 Chiffre</p>
            </div>
          </div>
          <div>
            <div className="containtInformationTitle">
              <h3>Informations sur la Société</h3>
            </div>
            <div className="containtField">
              <label>Société</label>
              <input
                type="text"
                name="compagnyName"
                placeholder="Nom de la Société..."
                required
              />
            </div>
            <div className="containtField">
              <label>Adresse</label>
              <input
                type="text"
                name="compagnyAdress"
                placeholder="Adresse..."
                required
              />
            </div>
            <div className="containtField">
              <label>Complément d'adresse</label>
              <input
                type="text"
                name="compagnyAdditionalAdress"
                placeholder="Complément d'adresse..."
              />
            </div>
            <div className="containtField">
              <label>Code Postal</label>
              <input
                type="number"
                name="compagnyPostalCode"
                placeholder="Code Postal..."
                maxLength="5"
                required
              />
            </div>
            <div className="containtField">
              <label>Ville</label>
              <input
                type="text"
                name="compagnyCity"
                placeholder="Ville..."
                required
              />
            </div>
            <div className="containtField">
              <label>Telephone</label>
              <input
                type="tel"
                name="compagnyTelephone"
                placeholder="Telephone..."
                required
              />
            </div>
            <div className="containtField">
              <label>Email</label>
              <input
                type="email"
                name="compagnyEmail"
                placeholder="Email de la Société..."
              />
            </div>
            <div className="containtField">
              <label>Site Internet</label>
              <input
                type="url"
                name="compagnyWebside"
                placeholder="Site Internet de la Société..."
              />
            </div>
            <div className="containtField">
              <label>Facebook (URL)</label>
              <input
                type="url"
                name="compagnyFacebook"
                placeholder="Lien Facebook de la société..."
              />
            </div>
            <div className="containtField">
              <label>Instagram (URL)</label>
              <input
                type="text"
                name="compagnyInstagram"
                placeholder="Lien Instagram de la société..."
              />
            </div>
            <div className="containtField">
              <label>LinkedIn (URL)</label>
              <input
                type="text"
                name="compagnyLinkedin"
                placeholder="Lien LinkedIn de la société..."
              />
            </div>
            <div className="containtField">
              <label>Twitter (URL)</label>
              <input
                type="text"
                name="compagnyTwitter"
                placeholder="Lien Twitter de la société..."
              />
            </div>
            <div className="containtField">
              <label>Secteur d'activité</label>
              <input
                type="text"
                name="compagnyActivityArea"
                placeholder="Secteur d'activité..."
                required
              />
            </div>
            <div className="containtField">
              <label>Description d'activité</label>
              <textarea
                type="text"
                name="compagnyActivityDescription"
                placeholder="Description de l'activité..."
                rows="10"
                cols="33"
                required
              />
            </div>
            <div className="containtField">
              <label>Logo de la societé</label>
              <input
                type="file"
                name="compagnyLogo"
                placeholder="Societé..."
                onChange={this.preview_image}
                required
              />
            </div>
            <div className="containtField">
              <label>Previsualisation</label>
              <img className="previewImage" id="compagnyLogo" />
            </div>
            <div className="containtField">
              <label>Photo de couverture</label>
              <input
                type="file"
                name="compagnyCoverPhoto"
                placeholder="Societé..."
                onChange={this.preview_image}
              />
            </div>
            <div className="containtField">
              <label>Previsualisation</label>
              <img className="previewImage" id="compagnyCoverPhoto" />
            </div>
            <div className="containtField">
              <label>Dossier de presentation en pdf</label>
              <input
                type="file"
                accept="application/pdf"
                name="compagnyPresentationFile"
                placeholder="Presentation..."
              />
            </div>
          </div>
          <div>
            <div className="containtInformationTitle">
              <h3>Informations du Représentant</h3>
            </div>
            <div className="containtField">
              <label>Nom</label>
              <input
                type="text"
                name="compagnyRepresentLastname"
                placeholder="Votre nom..."
                required
              />
            </div>
            <div className="containtField">
              <label>Prénom</label>
              <input
                type="text"
                name="compagnyRepresentFirstname"
                placeholder="Votre prénom..."
                required
              />
            </div>
            <div className="containtField">
              <label>Fonction</label>
              <input
                type="text"
                name="compagnyRepresentFunction"
                placeholder="Votre fonction..."
                required
              />
            </div>
            <div className="containtField">
              <label>Citation sur CIU</label>
              <textarea
                type="text"
                name="compagnyRepresentQuote"
                placeholder="Citation..."
                rows="5"
                cols="33"
              />
            </div>
            <div className="containtField">
              <label>Photo portrait</label>
              <input
                type="file"
                name="compagnyRepresentPhoto"
                placeholder="Votre Photo..."
                onChange={this.preview_image}
                required
              />
            </div>
            <div className="containtField">
              <label>Previsualisation</label>
              <img className="previewImage" id="compagnyRepresentPhoto" />
            </div>
          </div>
          <div className="containtInformationTitle">
            <h3>Cotisation : </h3>
            <p>La cotisation annuelle est de 50€</p>
            <span>
              Vous serez contacté par email pour les modalités de paiement de la
              cotisation
            </span>
          </div>
          <div className="containtField">
            <label>Mode de paiement</label>
            <select name="paymentMode" required>
              <option>Carte Bancaire</option>
              <option>Virement</option>
            </select>
          </div>
          <div className="containtCheckbox">
            <input type="checkbox" name="charterSigning" required />
            <p>J'accepte la Charte Cannes Is Up</p>
          </div>
          <div className="containtCheckbox">
            <input type="checkbox" name="RGPDSigning" required />
            <p>J'accepte les RGPD</p>
          </div>
          <div className="containtButtonFormulaire">
            <input
              type="submit"
              value="Confirmer"
              id="submit_but"
              onClick={() => {
                this.setState({ redirect: true });
              }}
            />
          </div>
        </form>
        {this.redirect()}
      </div>
    );
  }
}

export default inscrip;
