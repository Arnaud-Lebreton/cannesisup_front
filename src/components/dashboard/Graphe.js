import React, { Component } from "react";
import { Container, Image, Row, Col } from "react-bootstrap";
//Import css
import "./dashboardStyle.css";

class Graphe extends Component {
  ShowGraph1 = () => {
    return <Image src="Graphe1.gif" className="dashboardGraphDim"></Image>;
  };
  ShowGraph2 = () => {
    return <Image src="Graphe1.gif" className="dashboardGraphDim"></Image>;
  };
  render() {
    return (
      <Container className="dashboardGrapheAlign">
        <Row className="">
          <Col lg={6}>{this.ShowGraph1()}</Col>
          <Col lg={6}>{this.ShowGraph2()}</Col>
        </Row>
      </Container>
    );
  }
}

export default Graphe;
