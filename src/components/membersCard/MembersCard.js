import React, { Component } from "react";
import "./membersCard.css";
import "./searchBar.css";
import {
  Card,
  CardDeck,
  Image,
  Button,
  ListGroup,
  ListGroupItem,
  Col,
  Form,
  FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactGA from "react-ga";

/************** Google Analytics *************/
const trackingID = "UA-123504823-1";
ReactGA.initialize(trackingID);
ReactGA.pageview(window.location.pathname + window.location.search);

class MembersCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardDeck: [],
      search: null,
      nbMembers: 0,
    };
  }

  componentDidMount() {
    this.extraction();
  }

  /******* Récupère les données du champ Input Search ********/

  searchSpace = (event) => {
    let keyword = event.target.value;
    this.setState({ search: keyword });
  };

  /******* Récupération des données depuis la base de données ********/
  extraction = () => {
    const options = {
      method: "GET",
      headers: { "content-type": "application/json" },
      mode: "cors",
    };
    fetch("http://localhost:8080/profil/uploadAllActive", options)
      .then((res) => res.json())
      .then(
        (data) => {
          this.setState({
            cardDeck: data,
            nbMembers: data.length,
          });
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  /******* Boucle sur l'ensemble des données + filtre des données pour la barre de recherche ********/
  cardDeck = () => {
    return this.state.cardDeck
      .filter((data) => {
        if (this.state.search === null) return data;
        else if (
          data.compagnyName
            .toLowerCase()
            .includes(this.state.search.toLowerCase()) ||
          data.compagnyActivityArea
            .toLowerCase()
            .includes(this.state.search.toLowerCase())
        ) {
          return data;
        }
      })
      .map((element, index) => {
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
            <Col className="containtLogoMembersCard">
              <Card.Img
                className="logoMembersCard"
                src={element.compagnyLogo}
              />
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
            <Link to={"profil/" + element._id} className="containtMemberBouton">
              <Button className="memberBouton" id="memberBouton">
                voir le membre
              </Button>
            </Link>
          </Card>
        );
      });
  };

  render() {
    return (
      <div className="containtSearchBar">
        <div className="containerImage">
          <h1 className="containtTitle">annuaire des membres</h1>
        </div>

        <Form className="containtForm">
          <FormControl
            type="text"
            placeholder="Recherchez : un membre, une activité, un mot clé..."
            className="form"
            onChange={(e) => this.searchSpace(e)}
          />
          <Button className="containtButtonSearchBar" disabled>
            <img src="Images/Icones/search-solid.svg" />
          </Button>
        </Form>
        <p className="textMembers">{this.state.nbMembers} membres</p>
        <CardDeck className="bodyContainer">{this.cardDeck()}</CardDeck>
      </div>
    );
  }
}

export default MembersCard;
