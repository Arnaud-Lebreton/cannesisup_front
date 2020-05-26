import React, { Component } from "react";
import "./formulaire.css";

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
      email: "",
      work: "",
      work_description: "",
      isShow: true,
      image_profil: "",
      image_fond: "",
      image_logo: "",
      facebook: "",
      twitter: "",
      linkedin: "",
    };
  }

  dataHandler = (e) => {
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
    fetch("http://localhost:8080/profil/insertSingle", options)
      .then((response) => response.json())
      .then(
        (data) => {
          alert("Votre demande a bien été prise en compte!");
        },
        (error) => {
          console.log(error);
        }
      );
  };

  render() {
    return (
      <div id="formulaire">
        <div
          id="bande"
          style={{ backgroundImage: "url(" + "Images/fond_contact.jpg" + ")" }}
        >
          <h1>Inscription</h1>
        </div>
        <form onSubmit={this.dataHandler}>
          <h3>Infos Personnel</h3>
          <label>Nom : </label>
          <input
            type="text"
            name="compagnyRepresentLastname"
            placeholder="Nom..."
            required
          />
          <label>Prenom : </label>
          <input
            type="text"
            name="compagnyRepresentFirstname"
            placeholder="Prenom..."
            required
          />
          <label>Fonction : </label>
          <input
            type="text"
            name="compagnyRepresentFunction"
            placeholder="Fonction..."
            required
          />
          <label>Email Privé : </label>
          <input
            type="email"
            name="membershipEmail"
            placeholder="Email..."
            required
          />
          <label>Mot de passe : </label>
          <input
            type="password"
            name="membershipHashPassword"
            placeholder="Password..."
            required
          />
          <label>Photo portrait : </label>
          <input
            type="file"
            name="compagnyRepresentPhoto"
            placeholder="Photo..."
            required
          />
          <label>Previsualisation : </label>
          <img />

          <br />
          <h3>Infos Societé</h3>
          <label>Société : </label>
          <input
            type="text"
            name="compagnyName"
            placeholder="Société..."
            required
          />
          <label>Adresse : </label>
          <input
            type="text"
            name="compagnyAdress"
            placeholder="Adresse..."
            required
          />
          <label>Complément d'adresse : </label>
          <input
            type="text"
            name="compagnyAdditionalAdress"
            placeholder="Complément d'adresse..."
          />
          <label>Code Postal : </label>
          <input
            type="number"
            name="compagnyPostalCode"
            placeholder="Code Postal..."
            required
          />
          <label>Secteur d'activité : </label>
          <input
            type="text"
            name="compagnyActivityArea"
            placeholder="Secteur d'activité..."
            required
          />
          <label>Description d'activité : </label>
          <textarea
            type="text"
            name="compagnyActivityDescription"
            placeholder="Description d'activité..."
            rows="10"
            cols="33"
            required
          />
          <label>Dossier de presentation en pdf : </label>
          <input
            type="file"
            name="compagnyPresentationFile"
            placeholder="Presentation..."
            required
          />
          <label>Logo de la societé : </label>
          <input
            type="file"
            name="compagnyLogo"
            placeholder="Societé..."
            required
          />
          <label>Previsualisation : </label>
          <img />
          <label>Photo de couverture : </label>
          <input
            type="file"
            name="compagnyCoverPhoto"
            placeholder="Societé..."
            required
          />
          <label>Previsualisation : </label>
          <img />
          <br />
          <label>Ville : </label>
          <input
            type="text"
            name="compagnyCity"
            placeholder="Ville..."
            required
          />
          <label>Telephone : </label>
          <input
            type="tel"
            name="compagnyTelephone"
            placeholder="Telephone..."
            required
          />
          <label>Email de la Societé : </label>
          <input
            type="email"
            name="compagnyEmail"
            placeholder="Email..."
            required
          />
          <br />
          <label>Site : </label>
          <input
            type="text"
            name="compagnyWebside"
            placeholder="lien du site de la société..."
            required
          />
          <br />
          <label>Facebook: </label>
          <input
            type="text"
            name="compagnyFacebook"
            placeholder="lien Facebook..."
            required
          />
          <br />
          <label>Instagram: </label>
          <input
            type="text"
            name="compagnyInstagram"
            placeholder="lien Instagram..."
            required
          />
          <br />
          <label>Linkedin : </label>
          <input
            type="text"
            name="compagnyLinkedin"
            placeholder="lien Linkedin..."
            required
          />
          <br />
          <label>Twitter : </label>
          <input
            type="text"
            name="compagnyTwitter"
            placeholder="lien Twitter..."
            required
          />
          <br />
          <label>Mode de payement : </label>
          <select name="paymentMode" required>
            <option>Carte Bancaire</option>
            <option>Virement</option>
          </select>
          {/* Si carte bancaire choisis affiche les input concernant la CB, si virement envoie mail avec RIB */}
          <br />
          <input type="checkbox" name="charterSigning" required />
          <p>Charte</p>
          <br />
          <input type="checkbox" name="RGPDSigning" required />
          <p>RGPD</p>
          <br />
          <input type="submit" value="Confirmer" id="submit_but" />
        </form>
      </div>
    );
  }
}

export default inscrip;
