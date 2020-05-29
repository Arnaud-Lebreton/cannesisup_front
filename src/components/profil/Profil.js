import React, { Component } from "react";
import "./Profil.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

//Il faut faire en sorte qu'à l'appuie du button confirmer || modifier certain element disparaissent ou reaparaisse
//Pour cacher plusieur element dans une condition ternaire on peut entourer tout les elements d'une balise
class Profil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compagnyRepresentFistname: "",
      compagnyRepresentLastname: "",
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
      compagnyPresentationFile: "",
      instagram: "",
      compagnyAdditionalAdress: "",
      compagnyPostalCode: "",
      compagnyCity: "",
      adminConnect: false,
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
    this.dataImport();
  }

  dataImport() {
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
            compagnyRepresentLastname: data[0].compagnyRepresentLastname,
            compagnyRepresentFirstname: data[0].compagnyRepresentFirstname,
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
            linkedin: data[0].compagnyLinkedin,
            compagnyPresentationFile: data[0].compagnyPresentationFile,
            compagnyAdditionalAdress: data[0].compagnyAdditionalAdress,
            compagnyPostalCode: data[0].compagnyPostalCode,
            compagnyCity: data[0].compagnyCity,
            instagram: data[0].instagram,
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
          let adminConnect = false;
          let memberConnected = true;
          if (localStorage.getItem("statut") === "admin") {
            adminConnect = true;
            memberConnected = false;
          }
          console.log(localStorage.getItem("statut"));

          this.setState({
            compagnyRepresentLastname: data[0].compagnyRepresentLastname,
            compagnyRepresentFirstname: data[0].compagnyRepresentFirstname,
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
            linkedin: data[0].compagnyLinkedin,
            compagnyPresentationFile: data[0].compagnyPresentationFile,
            instagram: data[0].instagram,
            compagnyAdditionalAdress: data[0].compagnyAdditionalAdress,
            compagnyPostalCode: data[0].compagnyPostalCode,
            compagnyCity: data[0].compagnyCity,
            isConnected: memberConnected,
            adminConnect: adminConnect,
          });
        });
    }
  }

  dataExport(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);
  }

  disconnect = () => {
    localStorage.removeItem("_id");
    localStorage.removeItem("token");
    localStorage.removeItem("_idMembership");
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

  testBouton = () => {
    if (this.state.adminConnect || this.state.isConnected) {
      if (this.state.isDisabled) {
        return (
          <input
            className="buttonSave"
            type="submit"
            onClick={() => this.hide(false)}
            value="MODIFIER"
          ></input>
        );
      } else {
        return (
          <input
            type="button"
            onClick={() => this.hide(true)}
            className="buttonSave"
            value="ENREGISTRER"
          ></input>
        );
      }
    } else {
      return;
    }
  };

  render() {
    return (
      <div>
        <div id="body">
          <div className="logoutDiv">
            {this.state.isConnected && (
              <a href="http://localhost:3000" onClick={this.disconnect}>
                {" "}
                <i
                  class="fas fa-2x fa-sign-out-alt logout"
                  id="deconnexion"
                  title="Déconnexion"
                ></i>
              </a>
            )}
          </div>
          <div className="logoutDiv">
            {/*visible que pour l'admin*/}
            {this.state.adminConnect && (
              <a href="http://localhost:3000/dashboard">
                {" "}
                <i
                  class="fas fa-2x fa-arrow-right logout"
                  id="deconnexion"
                  title="Retour Admin"
                ></i>
              </a>
            )}
          </div>
          <div id="middle_bloc">
            <div>
              <div>
                <img id="image_fond" src={this.state.image_fond} />
              </div>
              <div>
                {" "}
                {!this.state.isDisabled && (
                  <div>
                    <span>Couverture : </span>
                    <input
                      type="file"
                      onChange={this.preview_image}
                      name="image_fond"
                    />
                  </div>
                )}
              </div>
            </div>
            <div id="image_Logo">
              <img id="logo_ent" src={this.state.image_logo} />
              {!this.state.isDisabled && (
                <div>
                  {" "}
                  <span>Logo : </span>
                  <input
                    type="file"
                    name="logo_ent"
                    onChange={this.preview_image}
                  />
                </div>
              )}
              {!this.state.isDisabled && (
                <div>
                  <span>Brochure (pdf) : </span>
                  <input type="file" accept="application/pdf" />
                </div>
              )}

              {this.state.isDisabled && (
                <div className="containtDownloadDoc">
                  <div className="downloadText">
                    <p>
                      Télécharger la brochure
                      <br /> de la société
                    </p>
                  </div>
                  <div>
                    <a
                      id="download"
                      href={this.state.compagnyPresentationFile}
                      target="_blank"
                    >
                      <i class="fas fa-2x fa-download download"></i>
                    </a>
                  </div>
                </div>
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
              <div className="containtTextSociety">
                <textarea
                  style={{
                    border: this.state.border,
                    backgroundColor: this.state.background_color,
                  }}
                  placeholder="Parlez-nous de celle-ci..."
                  disabled={this.state.isDisabled}
                  name="society_description"
                  value={this.state.society_description}
                  onChange={this.handleChange}
                  className="dimTextarea1"
                />
              </div>
              <div className="activitySector">
                <h3 className="titreH3">Secteur d'activité</h3>
                <input
                  style={{
                    border: this.state.border,
                    width: "100%",
                    backgroundColor: this.state.background_color,
                  }}
                  className="containtActivitySector"
                  placeholder="Son Secteur d'Activité..."
                  disabled={this.state.isDisabled}
                  name="society_activity_sector"
                  value={this.state.society_activity_sector}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="paddingthis">
              <h3 className="titreH3">Coordonnées</h3>
              <div className="containtCoordAdress">
                <label>Adresse : </label>
                <div className="coordAdress">
                  <div>
                    <input
                      style={{
                        border: this.state.border,
                        backgroundColor: this.state.background_color,
                      }}
                      type="text"
                      name="society_adress"
                      placeholder="Adresse.."
                      disabled={this.state.isDisabled}
                      value={this.state.society_adress}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div>
                    <input
                      style={{
                        border: this.state.border,
                        backgroundColor: this.state.background_color,
                      }}
                      type="text"
                      name="compagnyAdditionalAdress"
                      placeholder="Complément d'adresse..."
                      disabled={this.state.isDisabled}
                      value={this.state.compagnyAdditionalAdress}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="coordPostal">
                    <div className="containtPostal">
                      <input
                        style={{
                          border: this.state.border,
                          backgroundColor: this.state.background_color,
                        }}
                        type="text"
                        name="compagnyPostalCode"
                        placeholder="Code postal..."
                        disabled={this.state.isDisabled}
                        value={this.state.compagnyPostalCode}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="coordCity">
                      <input
                        style={{
                          border: this.state.border,
                          backgroundColor: this.state.background_color,
                        }}
                        type="text"
                        name="compagnyCity"
                        placeholder="Ville..."
                        disabled={this.state.isDisabled}
                        value={this.state.compagnyCity}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="coordAdress">
                <label>Telephone : </label>
                <input
                  style={{
                    border: this.state.border,
                    backgroundColor: this.state.background_color,
                  }}
                  type="decimal"
                  name="phone_number"
                  placeholder="Telephone"
                  disabled={this.state.isDisabled}
                  value={this.state.phone_number}
                  onChange={this.handleChange}
                />
              </div>
              <div className="coordAdress">
                <label>Email :</label>
                <input
                  style={{
                    border: this.state.border,
                    backgroundColor: this.state.background_color,
                  }}
                  type="email"
                  name="email"
                  placeholder="Email"
                  disabled={this.state.isDisabled}
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>
              <div className="coordAdress">
                <label>Site : </label>
                <a href={this.state.society_website}></a>
                <input
                  style={{
                    border: this.state.border,
                    backgroundColor: this.state.background_color,
                  }}
                  type="url"
                  name="society_website"
                  placeholder="Site"
                  disabled={this.state.isDisabled}
                  value={this.state.society_website}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div id="social" className="paddingthis">
              <h3 className="titreH3">Reseaux Sociaux</h3>
              <div className="containtSocialNetwork">
                <a href={this.state.linkedin} target="_blank">
                  <i className="fab fa-3x fa-linkedin reseaux"></i>
                </a>
                {!this.state.isDisabled && (
                  <input
                    style={{
                      border: this.state.border,
                      backgroundColor: this.state.background_color,
                    }}
                    placeholder="Linkedin..."
                    name="linkedin"
                    disabled={this.state.isDisabled}
                    value={this.state.linkedin}
                    onChange={this.handleChange}
                  />
                )}

                <a href={this.state.facebook} target="_blank">
                  <i className="fab fa-3x fa-facebook-square reseaux"></i>
                </a>
                {!this.state.isDisabled && (
                  <input
                    style={{
                      border: this.state.border,
                      backgroundColor: this.state.background_color,
                    }}
                    placeholder="Facebook..."
                    disabled={this.state.isDisabled}
                    value={this.state.facebook}
                    onChange={this.handleChange}
                    name="facebook"
                  />
                )}

                <a href={this.state.twitter} target="_blank">
                  <i className="fab fa-3x fa-twitter-square reseaux"></i>
                </a>
                {!this.state.isDisabled && (
                  <input
                    style={{
                      border: this.state.border,
                      backgroundColor: this.state.background_color,
                    }}
                    placeholder="Twitter..."
                    disabled={this.state.isDisabled}
                    value={this.state.twitter}
                    onChange={this.handleChange}
                    name="twitter"
                  />
                )}
                <a href={this.state.instagram} target="_blank">
                  <i className="fab fa-3x fa-instagram reseaux"></i>
                </a>
                {!this.state.isDisabled && (
                  <input
                    style={{
                      border: this.state.border,
                      backgroundColor: this.state.background_color,
                    }}
                    placeholder="Instagram..."
                    disabled={this.state.isDisabled}
                    value={this.state.instagram}
                    onChange={this.handleChange}
                    name="instagram"
                  />
                )}
              </div>
            </div>
          </div>
          {/**/}
          <div id="side_bloc">
            <div id="profil_image">
              <img src={this.state.image_profil} id="image_profil" />
              {!this.state.isDisabled && (
                <div>
                  <span>Profil :</span>
                  <input
                    type="file"
                    name="image_profil"
                    onChange={this.preview_image}
                  />
                </div>
              )}
            </div>
            <div className="containtSideBloc">
              <h3>Dirigeant</h3>
              <div className="containtFieldName">
                <div className="FieldName">
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
                    placeholder="Profession..."
                    disabled={this.state.isDisabled}
                    name="work"
                    value={this.state.work}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="containtWordMember">
                <h3 className="titreH3">Parole de membre</h3>
                <textarea
                  style={{
                    border: this.state.border,
                    backgroundColor: this.state.background_color,
                  }}
                  placeholder="Description..."
                  disabled={this.state.isDisabled}
                  name="work_description"
                  value={this.state.work_description}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="buttonDiv"> {this.testBouton()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profil;
