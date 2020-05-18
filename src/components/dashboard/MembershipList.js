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
//Import style
import "bootstrap/dist/css/bootstrap.min.css";
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
      //
      modalColumnListShow: false,
      listInit: ["a", "b", "c", "d", "e"],
      currentList: ["a", "b", "c", "d"],
      remainingList: ["e", "f"],
      list1: "",
    };
  }

  //**********************************************
  // Lancement des extractions de données
  // Launch of data extraction
  componentDidMount() {
    this.extractionDashbordData();
  }
  //---------------------------------------------

  // Extractions des données de la base MongoDB:
  // Data extraction from the MongoDB database
  //---------------------------------------------

  // préparation des données et 1er affichage
  // data preparation and 1st display
  extractionDashbordData = () => {
    console.log("datademarrage");
    let dashboardJsonDataInit = dashboardJson.dashboardColumnListInit;
    let dashboardJsonDataShow = dashboardJson.dashboardColumnListShow;
    let membershipsJsonData = membershipsJson.membershipData;
    let dashboardJsonDataInitKey = Object.keys(dashboardJsonDataShow[0]);
    //Constitution des données d'affichage
    //Display data creation
    let dataList = [];
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
  //**********************************************
  // Reconstruit la liste filtrée avec pagination
  // build useful data for display in the table
  dashbordDataBuildInit = () => {
    console.log("init");
    //Pagination
    let first = this.state.dataRange[0];
    let last = this.state.dataRange[1];

    this.setState({
      membershipFilterPaginationData: this.state.membershipColumFilterData.slice(
        first,
        last
      ),
      membershipFilterList: this.state.membershipColumFilterData,
      membershipNumber: this.state.membershipColumFilterData.length,
    });
  };
  //---------------------------------------------
  // Construction des données filtrées pour affichage dans le tableau
  // build useful data for display in the table
  dashbordDataBuild = () => {
    console.log("build tout court");
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
          <th className="dashboardTableHeaderText dashboardTableHeaderCol1">
            Action
          </th>
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
            <th className="dashboardTableHeaderText" key={index}>
              {this.state.dashboardColumnListShow[0][element]}
            </th>
          );
        }
      );
    } else {
      return Object.keys(objet).map((element, index) => {
        if (index > 1) {
          return (
            <th className=" dashboardTableHeaderText" key={index}>
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
        <tr className="">
          <td colSpan={n + 1}>aucun élément n'a été trouvé</td>
        </tr>
      );
    } else {
      if (this.state.membershipFilterPaginationData) {
        return this.state.membershipFilterPaginationData.map(
          (element, index) => {
            return (
              <tr key={index} className="">
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
      <td className="" key={index}>
        <Button
          className="dashboardTableButton"
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
          className="dashboardTableButton"
          size="sm"
          variant="info"
          value={id}
          onClick={this.membershipSelection}
          name="modifier"
        >
          Modifier
        </Button>
        <Button
          className="dashboardTableButton"
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
          <td className=" dashboardTableRowText" key={index}>
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
      <InputGroup className="dashboardFilterSize">
        <FormControl
          size="sm"
          className="dashboardFilterText"
          placeholder="Recherche"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          name="textSearch"
          onChange={this.handleInput}
        />
        <InputGroup.Append>
          <Button
            size="sm"
            className="dashboardFilterButtonText"
            variant="primary"
            onClick={this.dashbordDataBuild}
          >
            OK
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );
  };
  //**********************************************
  // Gestion des boutons de ligne
  // Line button management
  membershipSelection = (e) => {
    this.setState({
      modalShow: !this.state.modalShow,
      textAction: e.target.name,
      id: e.target.value,
    });
  };
  //---------------------------------------------
  //Gestion des confirmations de commandes
  //Management of order confirmations
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
  //**********************************************
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
  //**********************************************
  // Afficahge de la modale de gestion des colonnes
  // Display of the column management mode
  modalColumnList = () => {
    const handleClose = () => this.setState({ modalColumnListShow: false });
    const handleShow = () => this.setState({ modalColumnListShow: true });
    return (
      <>
        <Button
          variant="primary"
          size="sm"
          className="dashboardModalButtonSize"
          onClick={handleShow}
        >
          Gestion des champs
        </Button>
        <Modal
          show={this.state.modalColumnListShow}
          onHide={handleClose}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Gestion des champs</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.modalListField()}</Modal.Body>
          <Modal.Footer>
            <Button
              className="dashboardFilterText"
              variant="secondary"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              className="dashboardFilterText"
              variant="primary"
              onClick={handleClose}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
  //---------------------------------------------
  // Afficahge de la modale de gestion des colonnes
  // Display of the column management mode
  modalDataList = () => {
    //Liste des colonnes
    let remainingList = this.state.dashboardColumnListInit[0];
    let remainingListValues = Object.values(remainingList);

    let currentList = this.state.dashboardColumnListShow[0];
    let currentListValues = Object.values(currentList).slice(2);

    let listMemory = [];
    remainingListValues.slice(2).forEach((element) => {
      if (!currentListValues.includes(element)) {
        listMemory.push(element);
      }
    });
    console.log(currentListValues);

    this.setState({
      remainingList: listMemory,
      currentList: currentListValues,
    });
  };

  // Afficahge de la modale de gestion des colonnes
  // Display of the column management mode
  modalListField = () => {
    return (
      <div className="">
        <Form.Group
          className="dashboardModalListWidth"
          controlId="exampleForm.ControlSelect2"
        >
          <Form.Label className="dashboardInputText">
            Champs disponibles
          </Form.Label>
          <Form.Control
            name="list1"
            as="select"
            multiple
            onDoubleClick={this.addData}
          >
            {this.modalListShow(this.state.remainingList)}
          </Form.Control>
        </Form.Group>
        <Form.Group
          className="dashboardModalListWidth"
          controlId="exampleForm.ControlSelect2"
        >
          <Form.Label className=" ">Champs affichés</Form.Label>
          <Form.Control
            name="list2"
            as="select"
            multiple
            onDoubleClick={this.subData}
          >
            {this.modalListShow(this.state.currentList)}
          </Form.Control>
        </Form.Group>
      </div>
    );
  };

  modalListShow = (list) => {
    return list.map((element) => {
      return <option className="dashboardInputText">{element}</option>;
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

  render() {
    return (
      <Container className="dashboardGlobalSize">
        <div className="dashboardFilter">{this.inputFilterTable()}</div>
        <div className="dashboardAlignButton">
          <div>{this.paginationTable()}</div>
          <div>{this.modalColumnList()}</div>
        </div>
        <p className="dashboardCounterText">
          Nombre d'adhérents trouvé : {this.state.membershipNumber}
        </p>
        <Table striped bordered hover responsive className="">
          <thead>{this.headerTable()}</thead>
          <tbody>{this.dataTable()}</tbody>
        </Table>
        {this.alertShow()}
      </Container>
    );
  }
}
export default MembershipList;
