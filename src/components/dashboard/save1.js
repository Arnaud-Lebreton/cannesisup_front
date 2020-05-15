import React, { Component } from "react";
import {
  Container,
  Table,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
//Import css
import "./membershipStyle.css";
//Import des données fictives JSON
import membershipsJson from "../fictivesdata/membershipData.json";
import dashboardJson from "../fictivesdata/dashboardData.json";

class MembershipList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      membershipData: [{}],
      dashboardColumnListInit: [],
      dashboardColumnListShow: [{}],
      membershipFilterData: [{}],
    };
  }
  // Lancement des extractions de données
  // Launch of data extraction
  componentDidMount() {
    this.extractionDashbordData();
  }
  //---------------------------------------------

  // Extractions des données fictive fichier Json:
  // Fictitious data extracts from Json file:
  extractionDashbordData = () => {
    let dashboardJsonDataInit = dashboardJson.dashboardColumnListInit;
    let dashboardJsonDataShow = dashboardJson.dashboardColumnListShow;
    let membershipsJsonData = membershipsJson.membershipData;
    let dashboardJsonDataInitKey = Object.keys(dashboardJsonDataShow[0]);
    let dataList = [];
    //Constitution des données d'affichage
    //Display data creation
    membershipsJsonData.forEach((elementData) => {
      let dataObject = {};
      dashboardJsonDataInitKey.forEach((elementkey) => {
        if (elementData[elementkey]) {
          dataObject[elementkey] = elementData[elementkey];
        }
      });
      dataList.push(dataObject);
    });
    this.setState({
      membershipData: membershipsJsonData,
      dashboardColumnListInit: dashboardJsonDataInit,
      dashboardColumnListShow: dashboardJsonDataShow,
      membershipFilterData: dataList,
    });
  };
  //---------------------------------------------

  // Extractions des données de la base MongoDB:
  // Data extraction from the MongoDB database
  //
  //
  //
  //---------------------------------------------

  // Constrution des entêtes du tableau des adhérents
  //build memberships header's table
  headerTable = () => {
    if (this.state.membershipFilterData) {
      return (
        <tr>
          <th>Action</th>
          {this.textHeaderCreate(this.state.membershipFilterData[0])}
        </tr>
      );
    }
  };
  textHeaderCreate = (objet) => {
    return Object.keys(objet).map((element, index) => {
      return (
        <th key={index}>{this.state.dashboardColumnListShow[0][element]}</th>
      );
    });
  };
  //---------------------------------------------

  // Construction du corps du tableau des adhérents
  // build memberships boby's table
  dataTable = () => {
    if (this.state.membershipFilterData) {
      return this.state.membershipFilterData.map((element, index) => {
        return (
          <tr key={index}>
            {this.boutonCreate(index, element.id, element.memberActive)}
            {this.textBodyCreate(element)}
          </tr>
        );
      });
    }
  };

  boutonCreate = (index, id, status) => {
    let colorStatus, textStatus, disabledStatus;
    if (status == "oui") {
      colorStatus = "success";
      textStatus = "Actif";
      disabledStatus = true;
    } else {
      colorStatus = "secondary";
      textStatus = "Attente";
      disabledStatus = false;
    }
    return (
      <td key={index}>
        <Button
          className="tableText"
          variant={colorStatus}
          value={id}
          onClick={this.membershipSelection}
          disabled={disabledStatus}
        >
          {textStatus}
        </Button>
        <Button
          className="tableText"
          variant="info"
          value={id}
          onClick={this.membershipSelection}
        >
          Modifier
        </Button>
        <Button
          className="tableText"
          variant="danger"
          value={id}
          onClick={this.membershipSelection}
        >
          Retirer
        </Button>
      </td>
    );
  };
  textBodyCreate = (array) => {
    return Object.values(array).map((element, index) => {
      return <td key={index}>{element}</td>;
    });
  };
  //---------------------------------------------

  // Filtre de données
  // Data filter
  inputFilterTable = () => {
    return (
      <InputGroup className="tableInput">
        <FormControl
          className="tableText"
          placeholder="Recherche"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Append>
          <Button className="tableText" variant="dark">
            OK
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );
  };

  //---------------------------------------------

  // Gestion des boutons de ligne
  // Line button management
  membershipSelection = (e) => {
    console.log(e.target.value);
  };
  //---------------------------------------------

  render() {
    return (
      <Container>
        <div>{this.inputFilterTable()}</div>
        <Table className="tableText" striped bordered hover responsive>
          <thead>{this.headerTable()}</thead>
          <tbody>{this.dataTable()}</tbody>
        </Table>
      </Container>
    );
  }
}

export default MembershipList;
