import React, { Component } from "react";
import { Button, Modal, Form, Container } from "react-bootstrap";
//Import css
import "./dashboardStyle.css";

class ColumnList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      listInit: ["a", "b", "c", "d", "e"],
      currentList: ["a", "b", "c", "d"],
      remainingList: ["e", "f"],
      list1: "",
    };
  }

  listShow = (list) => {
    return list.map((element) => {
      return <option>{element}</option>;
    });
  };

  subData = (e) => {
    let field = e.target.value;
    for (let i = 0; i < this.state.currentList.length; i++) {
      if (this.state.currentList[i] == field) {
        this.state.currentList.splice(i, 1);
        this.state.remainingList.push(field);
        this.state.remainingList.sort();
        break;
      }
    }
    console.log(field);
    console.log(this.state.remainingList);
    console.log(this.state.currentList);
    this.setState({ list1: 1 });
  };

  addData = (e) => {
    let field = e.target.value;
    for (let i = 0; i < this.state.currentList.length; i++) {
      if (this.state.remainingList[i] == field) {
        this.state.remainingList.splice(i, 1);
        this.state.currentList.push(field);
        this.state.currentList.sort();
        break;
      }
    }
    console.log(field);
    console.log(this.state.remainingList);
    console.log(this.state.currentList);
    this.setState({ list1: 1 });
  };

  listField = () => {
    return (
      <div className="row center">
        <Form.Group className="form" controlId="exampleForm.ControlSelect2">
          <Form.Label>Champs restant</Form.Label>
          <Form.Control
            name="list1"
            as="select"
            multiple
            onDoubleClick={this.addData}
          >
            {this.listShow(this.state.remainingList)}
          </Form.Control>
        </Form.Group>
        <Form.Group className="form" controlId="exampleForm.ControlSelect2">
          <Form.Label>Champs en cours</Form.Label>
          <Form.Control
            name="list2"
            as="select"
            multiple
            onDoubleClick={this.subData}
          >
            {this.listShow(this.state.currentList)}
          </Form.Control>
        </Form.Group>
      </div>
    );
  };

  modal = () => {
    const handleClose = () => this.setState({ show: false });
    const handleShow = () => this.setState({ show: true });
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Gestion des champs
        </Button>
        <Modal show={this.state.show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Gestion des champs</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.listField()}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  render() {
    return <Container>{this.modal()}</Container>;
  }
}

export default ColumnList;
