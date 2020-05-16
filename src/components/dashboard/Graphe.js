import React, { Component } from "react";
import {
  Container,
  Table,
  Button,
  InputGroup,
  FormControl,
  Pagination,
  Modal,
  Image,
} from "react-bootstrap";
//Import css
import "./membershipStyle.css";

class Graphe extends Component {
  ShowGraph1 = () => {
    return <Image src="Graphe1.gif" className="dimGraph"></Image>;
  };
  ShowGraph2 = () => {
    return <Image src="Graphe1.gif" className="dimGraph"></Image>;
  };
  render() {
    return (
      <Container className="alignGraphe">
        {this.ShowGraph1()}
        {this.ShowGraph2()}
      </Container>
    );
  }
}

export default Graphe;
