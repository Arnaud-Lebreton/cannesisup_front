import React, { Component } from "react";
import {
  Container,
  Table,
  Button,
  Image,
  OverlayTrigger,
  Tooltip,
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
    return Object.keys(objet).map((element) => {
      return <th>{this.state.dashboardColumnListShow[0][element]}</th>;
    });
  };
  //---------------------------------------------

  // Construction du corps du tableau des adhérents
  // build memberships boby's table
  dataTable = () => {
    if (this.state.membershipFilterData) {
      return this.state.membershipFilterData.map((element, index) => {
        return (
          <tr>
            {this.boutonCreate(index, element.id, element.memberActive)}
            {this.textBodyCreate(element)}
          </tr>
        );
      });
    }
  };

  boutonCreate = (index, id, status) => {
    let colorStatus, textStatus;
    if (status) {
      colorStatus = "success";
      textStatus = "En ligne";
    } else {
      colorStatus = "secondary";
      textStatus = "Attente";
    }
    return (
      <td>
        <Button
          className="tableText"
          variant={colorStatus}
          key={index}
          value={id}
          onClick={this.membershipSelection}
        >
          {textStatus}
        </Button>
        <Button
          className="tableText"
          variant="info"
          key={index}
          value={id}
          onClick={this.membershipSelection}
        >
          Modifier
        </Button>
        <Button
          className="tableText"
          variant="danger"
          key={index}
          value={id}
          onClick={this.membershipSelection}
        >
          Retirer
        </Button>
      </td>
    );
  };
  textBodyCreate = (array) => {
    return Object.values(array).map((element) => {
      return <td>{element}</td>;
    });
  };
  // Gestion des boutons de ligne
  // Line button management
  membershipSelection = (e) => {
    console.log(e.target.value);
  };
  //---------------------------------------------

  render() {
    return (
      <Container>
        <Table className="tableText" striped bordered hover responsive>
          <thead>{this.headerTable()}</thead>
          <tbody>{this.dataTable()}</tbody>
        </Table>
      </Container>
    );
  }
}

export default MembershipList;
