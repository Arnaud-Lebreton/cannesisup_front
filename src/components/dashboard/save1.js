import React, { Component } from "react";
import {
  Container,
  Table,
  Button,
  InputGroup,
  FormControl,
  Pagination,
  Modal,
  Form,
} from "react-bootstrap";
//Import components
import ColumnList from "./ColumnList";
//Import css
import "./dashboardStyle.css";
//Import des données fictives JSON
import membershipsJson from "../fictivesdata/membershipData.json";
import dashboardJson from "../fictivesdata/dashboardData.json";

class MembershipList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      membershipData: [{}], //Données extraite collection adhérent complète
      dashboardColumnListShow: [{}], //Données extraite collection Dashboard - liste colonnne a afficher
      dashboardColumnListInit: [{}], // Données extraite collection dashboard - Liste des colonnes disponibles
      membershipFilterList: [{}], //Données filtrées et paginées
      membershipFilterPaginationData: [{}], //Données filtrées et paginées
      membershipColumFilterData: [{}], //Données filtrées
      textSearch: "",
      modalShow: false,
      textAction: "",
      id: "",
      dataRange: [0, 5],
      nPerPage: 5,
      activePage: 1,
      lignCounter: 0,
      membershipNumber: 0,
      modalColumnshow: false,
      listColumn: "",
      remainingList: [],
      currentList: [],
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
    //Pagination
    let first = this.state.dataRange[0];
    let last = this.state.dataRange[1];

    this.setState({
      membershipData: membershipsJsonData,
      dashboardColumnListInit: dashboardJsonDataInit,
      dashboardColumnListShow: dashboardJsonDataShow,
      membershipFilterPaginationData: dataList.slice(first, last),
      membershipColumFilterData: dataList,
      membershipFilterList: dataList,
      membershipNumber: dataList.length,
    });
  };
  //---------------------------------------------
  // Reconstruit la liste filtrée avec pagination
  // build useful data for display in the table
  dashbordDataBuildInit = () => {
    //Pagination
    let first = this.state.dataRange[0];
    let last = this.state.dataRange[1];
    this.setState({
      membershipFilterPaginationData: this.state.membershipColumFilterData.slice(
        first,
        last
      ),
      membershipFilterList: this.state.membershipColumFilterData,
    });
  };
  //---------------------------------------------

  // Construction des données filtrées pour affichage dans le tableau
  // build useful data for display in the table
  dashbordDataBuild = () => {
    console.log("ici");
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
    let first = 0;
    let last = this.state.nPerPage;
    this.setState({
      membershipFilterPaginationData: dataList.slice(first, last),
      membershipFilterList: dataList,
      activePage: 1,
      dataRange: [0, this.state.nPerPage],
      membershipNumber: dataList.length,
    });
  };
  //---------------------------------------------

  // Constrution du tableau des adhérents
  //build memberships header's table
  headerTable = () => {
    if (this.state.membershipFilterPaginationData) {
      return (
        <tr>
          <th className="tableheaderText tableAction">Action</th>
          {this.textHeaderCreate(this.state.membershipFilterPaginationData[0])}
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
            <th className="tableheaderText" key={index}>
              {this.state.dashboardColumnListShow[0][element]}
            </th>
          );
        }
      );
    } else {
      return Object.keys(objet).map((element, index) => {
        if (index > 1) {
          return (
            <th className="tableheaderText " key={index}>
              {this.state.dashboardColumnListShow[0][element]}
            </th>
          );
        }
      });
    }
  };
  //---------------------------------------------
  // Construction du corps du tableau des adhérents
  // build memberships boby's table
  dataTable = () => {
    if (!this.state.membershipFilterPaginationData[0]) {
      let n = Object.keys(this.state.dashboardColumnListShow[0]).length;
      return (
        <tr className="tableText cellTable">
          <td colSpan={n + 1}>aucun élément n'a été trouvé</td>
        </tr>
      );
    } else {
      if (this.state.membershipFilterPaginationData) {
        return this.state.membershipFilterPaginationData.map(
          (element, index) => {
            return (
              <tr key={index}>
                {this.boutonCreate(index, element.id, element.memberActive)}
                {this.textBodyCreate(element)}
              </tr>
            );
          }
        );
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
      <td className="cellTable" key={index}>
        <Button
          className="tableButton"
          size="sm"
          variant={colorStatus}
          value={id}
          onClick={this.membershipSelection}
          disabled={disabledStatus}
          name="activer"
        >
          {textStatus}
        </Button>
        <Button
          className="tableButton"
          size="sm"
          variant="info"
          value={id}
          onClick={this.membershipSelection}
          name="modifier"
        >
          Modifier
        </Button>
        <Button
          className="tableButton"
          size="sm"
          variant="danger"
          value={id}
          onClick={this.membershipSelection}
          name="supprimer"
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
    return Object.keys(array).map((element, index) => {
      if (index > 1) {
        return (
          <td className="tableText cellTable" key={index}>
            {array[element]}
          </td>
        );
      }
    });
  };
  //---------------------------------------------
  // Récupération de la clé de recherche
  // Retrieving the search key
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if (!e.target.value) {
      this.dashbordDataBuildInit();
      this.setState({
        [e.target.name]: e.target.value,
        activePage: 1,
        dataRange: [0, 4],
      });
    }
  };
  //---------------------------------------------
  // Filtre de données
  // Data filter
  inputFilterTable = () => {
    return (
      <InputGroup className="tableInput">
        <FormControl
          size="sm"
          className="inputText"
          placeholder="Recherche"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          name="textSearch"
          onChange={this.handleInput}
        />
        <InputGroup.Append>
          <Button
            size="sm"
            className="filterText"
            variant="primary"
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
    this.setState({
      modalShow: !this.state.modalShow,
      textAction: e.target.name,
      id: e.target.value,
    });
  };

  alertShow = () => {
    if (this.state.modalShow) {
      return (
        <>
          <Modal
            show={this.state.modalShow}
            onHide={() => {
              this.setState({ modalShow: !this.state.modalShow });
            }}
            animation={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                {this.state.textAction} : {this.state.id}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>Voulez vous continuer la commande</Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() =>
                  this.setState({ modalShow: !this.state.modalShow })
                }
              >
                Annuler
              </Button>
              <Button
                variant="primary"
                onClick={() =>
                  this.setState({ modalShow: !this.state.modalShow })
                }
              >
                valider
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
  };
  //---------------------------------------------
  // Affichage de la pagination
  // Pagination display
  paginationTable = () => {
    return (
      <Pagination className="dashboardPaginationStyle" size="sm">
        {this.paginationNumberItem()}
      </Pagination>
    );
  };
  //---------------------------------------------
  // Calcul du nombre de page à afficher
  // Calculation of the number of pages to display
  paginationNumberItem = () => {
    let nItem = this.state.membershipFilterList.length;
    if (nItem > 0) {
      let n = this.state.nPerPage;
      let xPage = Math.ceil(nItem / n);
      let items = [];
      for (let page = 1; page <= xPage; page++) {
        items.push(
          <Pagination.Item
            key={page}
            active={page === this.state.activePage}
            onClick={() => {
              this.paginationData(page);
            }}
          >
            {page}
          </Pagination.Item>
        );
      }
      return items;
    } else {
      return <Pagination.Item active={1}>0</Pagination.Item>;
    }
  };
  //---------------------------------------------
  // Calcul du contenu de la pagination
  // Content of the pagination calculation
  paginationData = (page) => {
    let first, last, activPage;
    if (!page) {
      first = this.state.dataRange[0];
      last = this.state.dataRange[1];
      activPage = 1;
    } else if (page === 1) {
      first = 0;
      last = this.state.nPerPage;
      activPage = page;
    } else {
      first = this.state.nPerPage * (page - 1);
      last = this.state.nPerPage * page;
      activPage = page;
    }
    this.setState({
      dataRange: [first, last],
      membershipFilterPaginationData: this.state.membershipFilterList.slice(
        first,
        last
      ),
      activePage: activPage,
    });
  };
  //---------------------------------------------
  // Lance la modale de gestion des colonnes
  //
  modalColumnList = () => {
    const handleClose = () => this.setState({ modalColumnshow: false });
    const handleShow = () => this.setState({ modalColumnshow: true });
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Gestion des champs
        </Button>
        <Modal
          show={this.state.modalColumnshow}
          onHide={handleClose}
          animation={false}
        >
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
    this.setState({ listColumn: 1 });
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

  render() {
    return (
      <Container className="colSize">
        <div className="filter">{this.inputFilterTable()}</div>
        <div className="alignButton">
          <div>{this.paginationTable()}</div>
          <div>{this.modalColumnList()}</div>
        </div>
        <p className="counterText">
          Nombre d'adhérents trouvé : {this.state.membershipNumber}
        </p>
        <Table striped bordered hover responsive>
          <thead>{this.headerTable()}</thead>
          <tbody>{this.dataTable()}</tbody>
        </Table>
        {this.alertShow()}
      </Container>
    );
  }
}
export default MembershipList;
