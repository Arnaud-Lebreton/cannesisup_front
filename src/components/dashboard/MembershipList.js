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
      dashboardColumnListShow: [{}], //Données extraite collection Dashboard - liste colonnne a afficher
      membershipData: [{}], //Données extraite collection adhérent complète
      dashboardColumnListInit: [{}], // Données extraite collection dashboard - Liste des colonnes disponibles
      membershipFilterData: [{}],
      textSearch: "",
    };
  }
  // Lancement des extractions de données
  // Launch of data extraction
  componentDidMount() {
    this.extractionDashbordData();
  }
  //---------------------------------------------

  // Extractions des données de la base MongoDB:
  // Data extraction from the MongoDB database
  //
  //
  //
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

  // Construction des données initiale pour affichage dans le tableau
  // build useful data for display in the table
  dashbordDataBuildInit = () => {
    let dashboardJsonDataShow = this.state.dashboardColumnListShow;
    let membershipsJsonData = this.state.membershipData;
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
      membershipFilterData: dataList,
    });
  };
  //---------------------------------------------

  // Construction des données filtrées pour affichage dans le tableau
  // build useful data for display in the table
  dashbordDataBuild = () => {
    //Fitre si textSearch non null
    if (this.state.textSearch !== "") {
      let membershipsData = this.state.membershipData;
      let dashboardDataShow = this.state.dashboardColumnListShow;
      let dataList = [];
      let SearchValidation = false;
      membershipsData.forEach((elementData) => {
        let dataObject = {};
        Object.keys(dashboardDataShow[0]).forEach((elementkey) => {
          if (elementData[elementkey]) {
            dataObject[elementkey] = elementData[elementkey];
          }
        });
        // recherche dans tous les champs dataObject si contient le filtre
        for (let i in dataObject) {
          let searchData = dataObject[i].toString().toUpperCase();
          if (searchData.includes(this.state.textSearch.toUpperCase())) {
            SearchValidation = true;
          }
        }
        if (SearchValidation) {
          dataList.push(dataObject);
          SearchValidation = false;
        }
      });
      this.setState({
        membershipFilterData: dataList,
      });
    } else {
      this.dashbordDataBuildInit();
    }
  };
  //---------------------------------------------

  // Constrution du tableau des adhérents
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
  //---------------------------------------------
  // Construction des entêtes tableau des adhérents
  // build memberships boby's table
  textHeaderCreate = (objet) => {
    if (!objet) {
      return Object.keys(this.state.dashboardColumnListShow[0]).map(
        (element, index) => {
          return (
            <th key={index}>
              {this.state.dashboardColumnListShow[0][element]}
            </th>
          );
        }
      );
    } else {
      return Object.keys(objet).map((element, index) => {
        return (
          <th key={index}>{this.state.dashboardColumnListShow[0][element]}</th>
        );
      });
    }
  };
  //---------------------------------------------
  // Construction du corps du tableau des adhérents
  // build memberships boby's table
  dataTable = () => {
    if (!this.state.membershipFilterData[0]) {
      let n = Object.keys(this.state.dashboardColumnListShow[0]).length;
      return (
        <tr>
          <td colSpan={n + 1}>aucun élément n'a été trouvé</td>
        </tr>
      );
    } else {
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
    }
  };
  //---------------------------------------------
  // Affichage des boutons de ligne
  // Display of line buttons
  boutonCreate = (index, id, status) => {
    let colorStatus, textStatus, disabledStatus;
    if (status === "oui") {
      colorStatus = "success";
      textStatus = "Actif";
      disabledStatus = true;
    } else {
      colorStatus = "secondary";
      textStatus = "Attente";
      disabledStatus = false;
    }
    return (
      <td key={index} className="tableText">
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
  //---------------------------------------------
  // Récupération de la clé de recherche
  // Retrieving the search key
  textBodyCreate = (array) => {
    return Object.values(array).map((element, index) => {
      return <td key={index}>{element}</td>;
    });
  };
  //---------------------------------------------
  // Récupération de la clé de recherche
  // Retrieving the search key
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if (!e.target.value) {
      this.dashbordDataBuildInit();
      this.setState({ [e.target.name]: "" });
    }
  };
  //---------------------------------------------
  // Filtre de données
  // Data filter
  inputFilterTable = () => {
    return (
      <InputGroup className="tableInput">
        <FormControl
          className="inputText"
          placeholder="Recherche"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          name="textSearch"
          onChange={this.handleInput}
        />
        <InputGroup.Append>
          <Button
            className="tableText"
            variant="dark"
            onClick={this.dashbordDataBuild}
          >
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
