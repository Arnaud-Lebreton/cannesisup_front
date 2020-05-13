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
        <Card style={{ width: "20rem" }}>
          <Col>
            <Card.Img variant="top" src={element.compagnyCoverPhoto} />
          </Col>
          <Col>
            <Image src={element.compagnyRepresentPhoto} roundedCircle />
          </Col>
          <Col>
            <Card.Img src={element.compagnyLogo} />
          </Col>
          <Card.Body>
            <Card.Title className="compagnyName">
              {element.compagnyName}
            </Card.Title>
            <Card.Text>{element.compagnyActivityDescription}</Card.Text>
          </Card.Body>
          <ListGroup>
            <ListGroupItem>
              <Card.Text className="textActivity">Secteur d'activité</Card.Text>
              <Card.Text className="textAreaActivity">
                {element.compagnyActivityArea}
              </Card.Text>
            </ListGroupItem>
            <ListGroupItem>
              <Card.Text className="textManager">Dirigeant</Card.Text>
              <Card.Text className="textRepresent">
                {element.compagnyRepresentName}{" "}
                {element.compagnyRepresentLastname}
              </Card.Text>
            </ListGroupItem>
          </ListGroup>
          <Button className="memberBouton">voir le membre</Button>
        </Card>
      );
    });
  };
  render() {
    return <CardDeck>{this.cardDeck()}</CardDeck>;
  }
}

export default MembersCard;
