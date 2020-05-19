import React, { Component } from "react";
import { Modal, Form, Button, Nav } from "react-bootstrap";
import "./login.css";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      close: false,
    };
  }

  changeclose = () => {
    this.setState({ close: !this.state.close });
  };
  render() {
    return (
      <div>
        <Nav.Link onClick={this.changeclose}>Mot de passe oublié ?</Nav.Link>
        <Modal onHide={this.changeclose} show={this.state.close}>
          <Modal.Header className="modalHeaderForgotPassword">
            <Modal.Title className="modalTitleForgotPassword">
              <h4>Pas de panique !</h4>
              <h5>C'est rien, ça arrive d'oublier !</h5>
            </Modal.Title>
            <img src="Images/logo-icone.png" alt="logo" />
          </Modal.Header>
          <Modal.Body>
            <Form>
              <p>
                Renseignez l'adresse e-mail avec laquelle vous vous êtes
                inscrit(e) et nous vous enverrons des instructions secrètes pour
                réinitialiser votre mot de passe.
              </p>
              <Form.Control
                className="containtInputForm"
                type="email"
                id="email"
                name="email"
                placeholder="Votre Email..."
              />
            </Form>
          </Modal.Body>
          <Modal.Footer className="modalButtonLogin">
            <Button className="buttonLogin" onClick={this.changeclose}>
              Fermer
            </Button>
            <Button className="buttonLogin">Envoyer</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ForgotPassword;
