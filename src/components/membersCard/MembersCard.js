import React, { Component } from "react";
import "./membersCard.css";
import data from "../fictivesdata/membershipData.json";
import {
  Card,
  CardDeck,
  Image,
  Button,
  ListGroup,
  ListGroupItem,
  Col,
} from "react-bootstrap";

class MembersCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardDeck: [],
    };
  }

  componentDidMount() {
    this.extraction();
  }

  /******* Récupération des données depuis le fichier membershipData.json ********/
  extraction = () => {
    let membershipData = data.membershipData;
    this.setState({
      cardDeck: membershipData,
    });
  };

  /******* Boucle sur l'ensemble des données  ********/
  cardDeck = () => {
    return this.state.cardDeck.map((element, index) => {
      return (
        <Card className="containerMembersCard" style={{ width: "22rem" }}>
          <Col className="containtCoverPhoto">
            <Card.Img
              className="coverPhoto"
              variant="top"
              src={element.compagnyCoverPhoto}
            />
          </Col>
          <Col className="containtRepresentPhoto">
            <Image
              className="representPhoto"
              src={element.compagnyRepresentPhoto}
            />
          </Col>
          <Col className="containtLogo">
            <Card.Img className="logo" src={element.compagnyLogo} />
          </Col>
          <Card.Body className="bodyCard">
            <Card.Title className="compagnyName">
              {element.compagnyName}
            </Card.Title>
            <Card.Text className="textDescription">
              {element.compagnyActivityDescription}
            </Card.Text>
            <ListGroup>
              <ListGroupItem className="listGroupItem">
                <Card.Text className="textActivity">
                  Secteur d'activité
                </Card.Text>
                <Card.Text className="textAreaActivity">
                  {element.compagnyActivityArea}
                </Card.Text>
              </ListGroupItem>
              <ListGroupItem className="listGroupItem">
                <Card.Text className="textManager">Dirigeant</Card.Text>
                <Card.Text className="textRepresent">
                  {element.compagnyRepresentName}{" "}
                  {element.compagnyRepresentLastname}
                </Card.Text>
              </ListGroupItem>
            </ListGroup>
          </Card.Body>
          <Button className="memberBouton" id="memberBouton">
            voir le membre
          </Button>
        </Card>
      );
    });
  };
  render() {
    return <CardDeck className="bodyContainer">{this.cardDeck()}</CardDeck>;
  }
}

export default MembersCard;
