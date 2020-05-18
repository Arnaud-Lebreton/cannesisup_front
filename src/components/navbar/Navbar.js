import React, { Component } from "react";
import { Nav, Image } from "react-bootstrap";
import "./navbar.css";

class Navbar extends Component {
  render() {
    return (
      <div className="containtNavbar">
        <Nav className="containtNavbarItem">
          <Image className="containtLogo" src="./Images/logo.png" alt="logo" />
          <Nav.Item>
            <Nav.Link href="https://cannesisup.com/#home" className="navLink">
              Accueil
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/#home" className="navLink">
              Annuaire
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/#home" className="navLink">
              Devenez adhérent
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="https://cannesisup.com/#dda" className="navLink">
              DDA îles de Lerins
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="https://cannesisup.com/#dda" className="navLink">
              Actualités
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href="https://cannesisup.com/equipe.php"
              className="navLink"
            >
              L'équipe
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href="https://cannesisup.com/#partenaires"
              className="navLink"
            >
              Partenaires
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href="https://cannesisup.com/contact.php"
              className="navLink"
            >
              Contact
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    );
  }
}

export default Navbar;
