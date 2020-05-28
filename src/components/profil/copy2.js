import React, { Component } from "react";
import "./Profil.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

//Il faut faire en sorte qu'à l'appuie du button confirmer || modifier certain element disparaissent ou reaparaisse
//Pour cacher plusieur element dans une condition ternaire on peut entourer tout les elements d'une balise
class Profil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      surname: "",
      society_name: "",
      society_description: "",
      society_activity_sector: "",
      society_adress: "",
      phone_number: "",
      society_website: "",
      email: "",
      work: "",
      work_description: "",
      isDisabled: true,
      image_profil: "",
      image_fond: "",
      image_logo: "",
      facebook: "",
      twitter: "",
      linkedin: "",
      border: "none",
      background_color: "none",
      //Mode lecture
      isConnected: false,
      compagnyPostalCode: "",
      compagnyCity: "",
      compagnyAdditionalAdress: "",
      compagnyRepresentFirstname: "",
      compagnyRepresentLastname: "",
      instagram: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  hide(a) {
    this.setState({ isDisabled: a });
    if (this.state.isDisabled) {
      this.setState({ background_color: "rgb(188, 229, 255)" });
    } else {
      this.setState({ border: "none", background_color: "white" });
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  componentDidMount() {
    this.datimport();
  }
  addres() {
    if (this.state.linkedin.length > 0) {
      this.setState({ Show_Link: true });
    }
    if (this.state.facebook.length > 0) {
      this.setState({ Show_Face: true });
    }
    if (this.state.twitter.length > 0) {
      this.setState({ Show_Twit: true });
    }
  }
  datimport() {
    if (this.props.match.params.id) {
      //Mode lecture
      console.log("lecture");
      const option = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
      };
      fetch(
        "http://localhost:8080/profil/uploadSingle?id=" +
          this.props.match.params.id,
        option
      )
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            name: data[0].compagnyRepresentLastname,
            surname: data[0].compagnyRepresentFirstname,
            society_name: data[0].compagnyName,
            society_description: data[0].compagnyActivityDescription,
            society_activity_sector: data[0].compagnyActivityArea,
            society_adress: data[0].compagnyAdress,
            phone_number: data[0].compagnyTelephone,
            society_website: data[0].compagnyWebside,
            email: data[0].compagnyEmail,
            work: data[0].compagnyRepresentFunction,
            work_description: data[0].compagnyRepresentQuote,
            image_profil: data[0].compagnyRepresentPhoto,
            image_fond: data[0].compagnyCoverPhoto,
            image_logo: data[0].compagnyLogo,
            facebook: data[0].compagnyFacebook,
            instagram: data[0].compagnyInstagram,
            twitter: data[0].compagnyTwitter,
            linkedin: data[0].compagnyLinkedin,
            compagnyPostalCode: data[0].compagnyPostalCode,
            compagnyCity: data[0].compagnyCity,
            compagnyAdditionalAdress: data[0].compagnyAdditionalAdress,
            compagnyRepresentFirstname: data[0].compagnyRepresentFirstname,
            compagnyRepresentLastname: data[0].compagnyRepresentLastname,
          });
        });
    } else {
      //Mode modification
      console.log("modification");

      let body;
      if (localStorage.getItem("_idMembership")) {
        body = {
          _id: localStorage.getItem("_id"),
          _idMembership: localStorage.getItem("_idMembership"),
        };
      } else {
        body = { _id: localStorage.getItem("_id") };
      }
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        mode: "cors",
        body: JSON.stringify(body),
      };
      fetch("http://localhost:8080/profil/uploadSingle", option)
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            name: data[0].compagnyRepresentLastname,
            surname: data[0].compagnyRepresentFirstname,
            society_name: data[0].compagnyName,
            society_description: data[0].compagnyActivityDescription,
            society_activity_sector: data[0].compagnyActivityArea,
            society_adress: data[0].compagnyAdress,
            phone_number: data[0].compagnyTelephone,
            society_website: data[0].compagnyWebside,
            email: data[0].compagnyEmail,
            work: data[0].compagnyRepresentFunction,
            work_description: data[0].compagnyRepresentQuote,
            image_profil: data[0].compagnyRepresentPhoto,
            image_fond: data[0].compagnyCoverPhoto,
            image_logo: data[0].compagnyLogo,
            facebook: data[0].compagnyFacebook,
            twitter: data[0].compagnyTwitter,
            instagram: data[0].compagnyInstagram,
            linkedin: data[0].compagnyLinkedin,
            compagnyPostalCode: data[0].compagnyPostalCode,
            compagnyCity: data[0].compagnyCity,
            compagnyAdditionalAdress: data[0].compagnyAdditionalAdress,
            compagnyRepresentFirstname: data[0].compagnyRepresentFirstname,
            compagnyRepresentLastname: data[0].compagnyRepresentLastname,

            isConnected: true,
          });
        });
    }
  }
  disconnect = () => {
    localStorage.removeItem("_id");
    localStorage.removeItem("token");
    localStorage.removeItem("_idMembership");
  };

  render() {
    return (
      <div>
        <div id="body">
          {this.state.isConnected && (
            <button id="deconnexion" type="button">
              <a href="https://cannesisup.com/#home" onClick={this.disconnect}>
                Déconnexion
              </a>
            </button>
          )}
          <div id="middle_bloc">
            <div
              id="image_fond"
              style={{ backgroundImage: "url(" + this.state.image_fond + ")" }}
            >
              {!this.state.isDisabled && <button>Ajouter Image</button>}
            </div>
            <div id="image_Logo" className="paddingthis">
              <img id="logo_ent" src={this.state.image_logo} />
              {!this.state.isDisabled && <button>Ajouter Image</button>}
              {!this.state.isDisabled && <button>Ajouter Brochure</button>}
              {this.state.isDisabled && (
                <button id="download" type="button">
                  Telecharger Brochure <img src="Images/Icones/download.png" />
                </button>
              )}
            </div>
            <div className="paddingthis">
              <input
                style={{
                  border: this.state.border,
                  color: "#f7316b",
                  backgroundColor: this.state.background_color,
                }}
                placeholder="Nom de Votre Societé..."
                disabled={this.state.isDisabled}
                name="society_name"
                value={this.state.society_name}
                onChange={this.handleChange}
              />
              {this.state.isDisabled && <p>{this.state.society_description}</p>}
              {!this.state.isDisabled && (
                <textarea
                  style={{
                    border: this.state.border,
                    backgroundColor: this.state.background_color,
                  }}
                  placeholder="Parlez-nous de celle-ci..."
                  disabled={this.state.isDisabled}
                  name="society_info"
                  value={this.state.society_description}
                  onChange={this.handleChange}
                />
              )}
              <div>
                <h3 className="titreH3">Secteur d'activité : </h3>
                <input
                  style={{
                    border: this.state.border,
                    backgroundColor: this.state.background_color,
                  }}
                  placeholder="Son Secteur d'Activité..."
                  disabled={this.state.isDisabled}
                  name="society_sector"
                  value={this.state.society_activity_sector}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="paddingthis">
              <h3 className="titreH3">Coordonnées : </h3>
              <div className="input_label">
                <label>Email de la Societé : </label>
                <input
                  style={{
                    border: this.state.border,
                    backgroundColor: this.state.background_color,
                  }}
                  type="email"
                  placeholder="Email"
                  disabled={this.state.isDisabled}
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>

              <div className="input_label">
                <label>Adresse : </label>
                <div className="adresse">
                  <input
                    style={{
                      border: this.state.border,
                      backgroundColor: this.state.background_color,
                    }}
                    type="text"
                    placeholder="Adresse"
                    disabled={this.state.isDisabled}
                    value={
                      this.state.society_adress +
                      ", " +
                      this.state.compagnyAdditionalAdress
                    }
                    onChange={this.handleChange}
                  />
                  <input
                    style={{
                      border: this.state.border,
                      backgroundColor: this.state.background_color,
                    }}
                    type="text"
                    placeholder="code postal"
                    disabled={this.state.isDisabled}
                    value={
                      this.state.compagnyPostalCode +
                      " " +
                      this.state.compagnyCity
                    }
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div className="input_label">
                <label>Telephone : </label>
                <input
                  style={{
                    border: this.state.border,
                    backgroundColor: this.state.background_color,
                  }}
                  type="decimal"
                  placeholder="Telephone"
                  disabled={this.state.isDisabled}
                  value={this.state.phone_number}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label>Site : </label>
                {this.state.isDisabled && (
                  <a href={this.state.society_website}>
                    {this.state.society_website}
                  </a>
                )}
              </div>
              {!this.state.isDisabled && (
                <div className="input_label">
                  <label>Site : </label>
                  <a href={this.state.society_website}></a>
                  <input
                    style={{
                      border: this.state.border,
                      backgroundColor: this.state.background_color,
                    }}
                    type="text"
                    placeholder="Site"
                    disabled={this.state.isDisabled}
                    value={this.state.society_website}
                    onChange={this.handleChange}
                  />
                </div>
              )}
            </div>
            <div id="social" className="padding1">
              <h3 className="titreH3">Reseaux Sociaux : </h3>
              {this.state.isDisabled && (
                <div>
                  <ul className="input_label">
                    <li>{this.state.Show_Face && <img />}</li>
                    <li> {this.state.Show_Link && <img />}</li>
                    <li>{this.state.Show_Twit && <img />}</li>
                  </ul>
                </div>
              )}
              <a href={this.state.facebook} target="_blank">
                <i className="fab fa-2x fa-facebook-square reseaux"></i>
              </a>
              <a href={this.state.instagram}>
                <i
                  className="fab fa-2x fa-instagram reseaux"
                  target="_blank"
                ></i>
              </a>
              <a href={this.state.twitter}>
                <i
                  className="fab fa-2x fa-twitter-square reseaux"
                  target="_blank"
                ></i>
              </a>
              <a href={this.state.linkedin}>
                <i
                  className="fab fa-2x fa-linkedin reseaux"
                  target="_blank"
                ></i>
              </a>
              {!this.state.isDisabled && (
                <div>
                  <div className="input_label">
                    <input value={this.state.facebook} />
                  </div>
                  <div className="input_label">
                    <img>Linkedin : </img>
                    <input value={this.state.linkedin} />
                  </div>
                  <div className="input_label">
                    <label>Twitter : </label>
                    <input value={this.state.twitter} />
                  </div>
                </div>
              )}
            </div>
          </div>
          {/**/}
          <div id="side_bloc">
            <div id="profil_image">
              <img src={this.state.image_profil} />
              {!this.state.isDisabled && <button>Ajouter Photo</button>}
            </div>

            <div>
              <h3 className="titreH3">Dirigeant</h3>
              <div className="nomPrenom">
                <input
                  style={{
                    border: this.state.border,
                    backgroundColor: this.state.background_color,
                  }}
                  placeholder="Nom..."
                  disabled={this.state.isDisabled}
                  name="compagnyRepresentLastname"
                  value={this.state.compagnyRepresentLastname}
                  onChange={this.handleChange}
                />
                <input
                  style={{
                    border: this.state.border,
                    backgroundColor: this.state.background_color,
                  }}
                  placeholder="Prénom..."
                  disabled={this.state.isDisabled}
                  name="compagnyRepresentFirstname"
                  value={this.state.compagnyRepresentFirstname}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div>
              <input
                style={{
                  border: this.state.border,
                  backgroundColor: this.state.background_color,
                }}
                placeholder="Profession..."
                disabled={this.state.isDisabled}
                name="profession"
                value={this.state.work}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <h3 className="titreH3">Parole de membre</h3>
              <p>{this.state.work_description}</p>
              {!this.state.isDisabled && (
                <textarea
                  style={{
                    border: this.state.border,
                    backgroundColor: this.state.background_color,
                  }}
                  placeholder="Description..."
                  disabled={this.state.isDisabled}
                  name="description"
                  value={this.state.work_description}
                  onChange={this.handleChange}
                />
              )}
            </div>
            {this.state.isConnected && (
              <div
                id="interaction"
                style={{ visibility: this.state.isConnected }}
              >
                {this.state.isDisabled && (
                  <button onClick={() => this.hide(false)}>Modifier</button>
                )}
                {!this.state.isDisabled && (
                  <button type="submit" onClick={() => this.hide(true)}>
                    Confirmer
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Profil;
