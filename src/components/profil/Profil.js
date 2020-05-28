import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./Profil.css";
import ProfilJson from "../fictivesdata/membershipData.json";
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
      Show_Link : false,
      Show_Twit : false,
      Show_Face : false,
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
  addres(){
    if (this.state.linkedin.length > 6) {
      this.setState({Show_Link : true})
    }
    if (this.state.facebook.length > 6) {
      this.setState({Show_Face : true})
    }
    if (this.state.twitter.length > 6) {
      this.setState({Show_Twit : true})
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
            twitter: data[0].compagnyTwitter,
            linkedin: data[0].compagnyLinkedin,
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
            linkedin: data[0].compagnyLinkedin,
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
                  backgroundColor: this.state.background_color,
                }}
                placeholder="Nom de Votre Societé..."
                disabled={this.state.isDisabled}
                name="society_name"
                value={this.state.society_name}
                onChange={this.handleChange}
              />
              <p>{this.state.society_description}</p>
              {!this.state.isDisabled && <textarea
                style={{
                  border: this.state.border,
                  backgroundColor: this.state.background_color,
                }}
                placeholder="Parlez-nous de celle-ci..."
                disabled={this.state.isDisabled}
                name="society_info"
                value={this.state.society_description}
                onChange={this.handleChange}
              />}
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
            <div className="paddingthis">
              <h3>Coordonnées : </h3>
              <div>
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
                <input
                  style={{
                    border: this.state.border,
                    backgroundColor: this.state.background_color,
                  }}
                  type="text"
                  placeholder="Adresse"
                  disabled={this.state.isDisabled}
                  value={this.state.society_adress}
                  onChange={this.handleChange}
                />
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
              
            </div>
            <div id="social" className="paddingthis">
              <h3>Reseaux Sociaux : </h3>
              <div className="input_label">
                <div>
                {this.state.Show_Face && <img href={this.state.facebook} src="facebook_icon.png" alt="facebook"/>}
                </div>
                <div>
                  {this.state.Show_Link && <img href={this.state.linkedin} src="linkedin_icon.png" alt="linkedin"/>}
                </div>
                <div>
                  {this.state.Show_Link && <img href={this.state.twitter} src="twitter_icon.png" alt="twitter"/>}
                </div>
              </div>
              
              {!this.state.isDisabled && <div>
                <div className="input_label">
                  <label>Facebook : </label>
                  <input value={this.state.facebook}/>
                </div>
                <div className="input_label">
                  <label>Linkedin : </label>
                  <input value={this.state.linkedin}/>
                </div>
                <div className="input_label">
                  <label>Twitter : </label>
                  <input value={this.state.twitter}/>
                </div>
              </div>}
            </div>
          </div>
          <div id="side_bloc">
            <div id="profil_image">
              <img src={this.state.image_profil} />
              {!this.state.isDisabled && <button>Ajouter Photo</button>}
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
              <h3>Parole de membre</h3>
              <p>{this.state.work_description}</p>
              {!this.state.isDisabled && <textarea
                style={{
                  border: this.state.border,
                  backgroundColor: this.state.background_color,
                }}
                placeholder="Description..."
                disabled={this.state.isDisabled}
                name="description"
                value={this.state.work_description}
                onChange={this.handleChange}
              />}
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
