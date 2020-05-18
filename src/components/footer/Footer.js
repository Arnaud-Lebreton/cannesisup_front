import React, { Component } from "react";
import "./footer.css";
import {} from "react-bootstrap-icons";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container-fluid hts-footer">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                Copyright © CANNES IS UP{" "}
                <a href="mentions-legales.php">Mentions légales</a>{" "}
                <a href="https://bluebeacon.fr/" target="_blank">
                  Réalisation : BLUE BEACON
                </a>
              </div>
              <div className="col-md-4">
                <a href="https://www.facebook.com/cannesisup/" target="_blank">
                  <i className="fa fa-4x fa-facebook-square"></i>
                </a>
                <a href="https://www.instagram.com/cannesisup/" target="_blank">
                  <i className="fa fa-4x fa-instagram"></i>
                </a>
                <a
                  href="https://www.youtube.com/channel/UCBIpW614EFQGZrFVl6ARsAw"
                  target="_blank"
                >
                  <i className="fa fa-4x fa-youtube-square"></i>
                </a>
                <a href="https://twitter.com/cannesisup" target="_blank">
                  <i className="fa fa-4x fa-twitter-square"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
