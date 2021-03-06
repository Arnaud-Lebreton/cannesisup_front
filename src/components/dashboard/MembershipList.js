import React, { Component } from "react";
import moment from "moment";
import {
  Container,
  Table,
  Button,
  InputGroup,
  FormControl,
  Pagination,
  Modal,
  Form,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
//Import style
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./dashboardStyle.css";

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
      dataRange: "",
      nPerPage: "",
      activePage: 1,
      lignCounter: 0,
      paginationChange: false,
      membershipNumber: 0,
      //
      modalColumnListShow: false,
      listInit: [],
      currentList: [],
      remainingList: [],
      list1: "",
      //Tri colonne
      sortCulum: false,
      sortColumnActiv: "",
      //
      redirect: false,
      redirectAccueil: false,
    };
  }
  componentDidMount() {
    if (localStorage.getItem("statut")) {
      this.getMembershipData();
      this.getDashbordData();
    } else {
      return <div className="dashboardGlobalSize">Erreur</div>;
    }
  }
  //**********************************************
  // Extractions des données de la base MongoDB:
  // Data extraction from the MongoDB database
  getMembershipData = () => {
    console.log("getMembershipData");
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      mode: "cors",
      body: JSON.stringify({ _id: localStorage.getItem("_id") }),
    };
    fetch("http://localhost:8080/profil/uploadAll", options)
      .then((res) => res.json())
      .then(
        (data) => {
          this.setState({
            membershipData: data,
          });
        },
        (error) => {
          console.log(error);
        }
      );
  };
  getDashbordData = () => {
    console.log("getDashbordData");

    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      mode: "cors",
      body: JSON.stringify({ _id: localStorage.getItem("_id") }),
    };
    fetch("http://localhost:8080/dashboard/upload", options)
      //*********************************************************************************************/

      //fetch("http://localhost:8080/dashboard/upload", options)
      .then((res) => res.json())
      .then(
        (data) => {
          let dashboardJsonDataShow = data[0].dashboardColumnListShow;
          let membershipsJsonData = this.state.membershipData;
          let dashboardJsonDataInitKey = Object.keys(dashboardJsonDataShow[0]);
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
          let first = data[0].dashboardPagination[0];
          let last = data[0].dashboardPagination[1];
          // gestion des champs
          let memDashboardColumnListInit = data[0].dashboardColumnListInit[0];
          delete memDashboardColumnListInit._id;
          delete memDashboardColumnListInit.memberActive;
          let listInit = Object.values(memDashboardColumnListInit).sort();

          let memDashboardColumnListShow = data[0].dashboardColumnListShow[0];
          delete memDashboardColumnListShow._id;
          let currentList = Object.values(memDashboardColumnListShow).slice(1);

          let remainingList = [];
          listInit.forEach((initElement) => {
            let count = null;
            currentList.forEach((curentElement) => {
              if (initElement === curentElement) {
                count++;
              }
            });
            if (!count) {
              remainingList.push(initElement);
            }
          });
          this.setState({
            dashboardColumnListInit: data[0].dashboardColumnListInit,
            dashboardColumnListShow: data[0].dashboardColumnListShow,
            dataRange: data[0].dashboardPagination,
            nPerPage: data[0].dashboardPagination[1],
            membershipFilterPaginationData: dataList.slice(first, last),
            membershipColumFilterData: dataList,
            membershipFilterList: dataList,
            membershipNumber: dataList.length,
            listInit: listInit,
            currentList: currentList,
            remainingList: remainingList,
          });
        },
        (error) => {
          console.log(error);
        }
      );
  };
  deleteMembershipData = () => {
    console.log("deleteMembershipData");
    const body = {
      _id: this.state.id,
    };
    const options = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      mode: "cors",
      body: JSON.stringify(body),
    };
    fetch("http://localhost:8080/profil/delete", options)
      .then((response) => response.json())
      .then(
        (data) => {
          this.getMembershipData();
          this.getDashbordData();
          alert("suppression effectuée!");
        },
        (error) => {
          console.log(error);
        }
      );
  };
  updateMembershipData = () => {
    console.log("updateMembershipData");
    const validationDate = moment().format("DD/MM/YYYY");

    console.log(validationDate);
    const body = {
      _id: this.state.id,
      memberActive: "oui",
      validationDate: validationDate,
    };
    const options = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      mode: "cors",
      body: JSON.stringify(body),
    };
    fetch("http://localhost:8080/profil/activate", options)
      .then((res) => res.json())
      .then(
        (data) => {
          this.getMembershipData();
          this.getDashbordData();
        },
        (error) => {
          console.log(error);
        }
      );
  };
  activateMail = () => {
    const body = {
      _id: this.state.id,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      mode: "cors",
      body: JSON.stringify(body),
    };
    fetch("http://localhost:8080/mail/activate", options)
      .then((res) => res.json())
      .then(
        (data) => {},
        (error) => {
          console.log(error);
        }
      );
  };
  //**********************************************
  // Reconstruit la liste filtrée avec pagination
  // build useful data for display in the table
  dashbordDataBuildInit = () => {
    console.log("dashbordDataBuildInit");
    //Pagination
    let first = this.state.dataRange[0];
    let last = this.state.dataRange[1];
    console.log("last");
    console.log(last);
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
    console.log("dashbordDataBuild");
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
    console.log("headerTable");
    if (this.state.membershipFilterPaginationData) {
      return (
        <tr>
          <th className="dashboardTableHeaderText dashboardTableHeaderCol1">
            <button
              key={0}
              name={0}
              className="dashboardTableHeaderText"
              onClick={this.columnSelection}
            >
              Action
            </button>
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
    console.log("textHeaderCreate");
    if (!objet) {
      return Object.keys(this.state.dashboardColumnListShow[0]).map(
        (element, index) => {
          if (index > 1) {
            return (
              <th className="dashboardTableHeaderText">
                <button
                  key={index - 1}
                  name={index - 1}
                  className="dashboardTableHeaderText"
                  onClick={this.columnSelection}
                >
                  {this.state.dashboardColumnListShow[0][element]}
                </button>
              </th>
            );
          }
        }
      );
    } else {
      console.log(this.state.currentList);
      console.log(this.state.dashboardColumnListShow[0]);
      return Object.keys(objet).map((element, index) => {
        if (index > 1) {
          return (
            <th className="dashboardTableHeaderText">
              <button
                key={index - 1}
                name={index - 1}
                className=" dashboardTableHeaderText"
                onClick={this.columnSelection}
              >
                {this.state.dashboardColumnListShow[0][element]}
              </button>
            </th>
          );
        }
      });
    }
  };
  //---------------------------------------------
  // Filtre par colonne
  // ----
  columnSelection = (e) => {
    let sortColumnActiv = this.state.sortColumnActiv;
    let sortCulum = this.state.sortCulum;
    let dashboardColumnListShow = this.state.dashboardColumnListShow[0];
    let membershipFilterList = this.state.membershipFilterList;
    let listText = [];
    let listData = [];
    //Réinitialiser lors de changement de colonne
    if (sortColumnActiv !== e.target.name) {
      sortColumnActiv = "";
      sortCulum = false;
    }
    //Tri croissant
    if (!sortCulum && sortColumnActiv === "") {
      let column = Object.keys(dashboardColumnListShow)[e.target.name];
      membershipFilterList.forEach((element, index) => {
        let elementUpper = element[column].toUpperCase();
        let elementConvE = elementUpper.replace(/é|è|ê|ë/gi, "E");
        let elementConvI = elementConvE.replace(/ï|î|-/gi, "I");
        let elementConvA = elementConvI.replace(/à|ä|â/gi, "A");
        listText.push(elementConvA + "-" + index);
      });
      listText.sort().forEach((element, index) => {
        let n = element.split("-")[1];
        listData.push(membershipFilterList[n]);
      });
      let first = 0;
      let last = this.state.nPerPage;
      this.setState({
        membershipFilterPaginationData: listData.slice(first, last),
        membershipFilterList: listData,
        activePage: 1,
        sortCulum: true,
        sortColumnActiv: e.target.name,
      });
    }
    //Tri décroissant
    if (sortCulum && sortColumnActiv === e.target.name) {
      let column = Object.keys(dashboardColumnListShow)[e.target.name];
      membershipFilterList.forEach((element, index) => {
        let elementUpper = element[column].toUpperCase();
        let elementConvE = elementUpper.replace(/é|è|ê|ë|@/gi, "E");
        let elementConvI = elementConvE.replace(/ï|î|-/gi, "I");
        let elementConvA = elementConvI.replace(/à|ä|â/gi, "A");
        //console.log(str);
        listText.push(elementConvA + "-" + index);
      });
      listText.sort();
      listText.reverse().forEach((element, index) => {
        let n = element.split("-")[1];
        listData.push(membershipFilterList[n]);
      });
      let first = 0;
      let last = this.state.nPerPage;
      this.setState({
        membershipFilterPaginationData: listData.slice(first, last),
        membershipFilterList: listData,
        activePage: 1,
        sortCulum: false,
        sortColumnActiv: "",
      });
    }
  };
  //---------------------------------------------
  // Construction du corps du tableau des adhérents
  // build memberships boby's table
  dataTable = () => {
    console.log("dataTable");
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
            console.log(element);
            return (
              <tr key={index} className="">
                {this.boutonCreate(index, element._id, element.memberActive)}
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
    console.log("boutonCreate");
    console.log(status);
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
      <td className="dashBoardTablePadding" key={index}>
        <Button
          className="dashboardTableButton"
          size="sm"
          variant={colorStatus}
          value={id}
          onClick={this.membershipSelection}
          disabled={disabledStatus}
          name="ACTIVER"
        >
          {textStatus}
        </Button>
        <Button
          className="dashboardTableButton"
          size="sm"
          variant="info"
          value={id}
          onClick={this.membershipSelection}
          name="MODIFIER"
        >
          Modifier
        </Button>
        <Button
          className="dashboardTableButton"
          size="sm"
          variant="danger"
          value={id}
          onClick={this.membershipSelection}
          name="SUPPRIMER"
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
    console.log("textBodyCreate");
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
    console.log("handleInput");
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
    console.log("inputFilterTable");
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
      let lastnameNameCompagny, compagny;
      let adText;
      let text = () => {
        if (this.state.textAction === "MODIFIER") {
          adText = "Accéder au profil de :";
        } else if (this.state.textAction === "SUPPRIMER") {
          adText = "Supprimer le profil de :";
        } else {
          adText = "Activer le profil de :";
        }
        let list = this.state.membershipData;
        let id = this.state.id;
        list.forEach((element, index) => {
          if (element._id === id) {
            lastnameNameCompagny =
              element.compagnyRepresentFirstname +
              " " +
              element.compagnyRepresentLastname;
            compagny = element.compagnyName;
          }
        });
        return (
          <div>
            <p>{adText}</p>
            <p className="dashBoardAlertName">{lastnameNameCompagny}</p>
            <p className="dashBoardAlertName">{compagny}</p>
          </div>
        );
      };
      let title = () => {
        return (
          <div>
            <img
              className="dashboardModalLogo"
              src="/images/logo-icone.png"
            ></img>{" "}
            {this.state.textAction}
          </div>
        );
      };

      let actionData = () => {
        if (this.state.textAction === "SUPPRIMER") {
          this.deleteMembershipData();
          this.setState({ modalShow: !this.state.modalShow, activePage: 1 });
        } else if (this.state.textAction === "ACTIVER") {
          this.updateMembershipData();
          this.activateMail();
          this.setState({ modalShow: !this.state.modalShow, activePage: 1 });
        } else if (this.state.textAction === "MODIFIER") {
          localStorage.setItem("_idMembership", this.state.id);
          this.setState({ redirect: true });
        }
      };

      return (
        <>
          <Modal
            size="sm"
            show={this.state.modalShow}
            onHide={() => {
              this.setState({ modalShow: !this.state.modalShow });
            }}
            animation={false}
          >
            <Modal.Header closeButton className="dashboardAlertButtonClose">
              <Modal.Title>{title()}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{text()}</Modal.Body>
            <Modal.Footer className="">
              <Button
                size="sm"
                className="dashBoardAlertButton"
                onClick={() =>
                  this.setState({ modalShow: !this.state.modalShow })
                }
              >
                Annuler
              </Button>

              <Button
                size="sm"
                className="dashBoardAlertButton"
                onClick={actionData}
              >
                valider
              </Button>
              {this.redirect()}
            </Modal.Footer>
          </Modal>
        </>
      );
    }
  };
  redirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/profil" />;
    }
  };
  //**********************************************
  // Affichage de la pagination
  // Pagination display
  paginationTable = () => {
    console.log("paginationTable");
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
    console.log("paginationNumberItem");
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
    console.log("paginationData");
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
  // Affichage du choix de la quantité de ligne par page
  // Display of the choice of line quantity per page
  paginationChoise = () => {
    return (
      <DropdownButton
        size="sm"
        id="dropdown-basic-button"
        title="Pagination"
        className="dashboardPaginationSize"
      >
        <Dropdown.Item
          onMouseLeave={this.paginationActivation()}
          onClick={() => {
            this.setState({
              dataRange: [0, 10],
              activePage: 1,
              nPerPage: 10,
              paginationChange: !this.state.paginationChange,
            });
          }}
          className="dashboardPaginationStyle"
        >
          x10
        </Dropdown.Item>
        <Dropdown.Item
          onMouseLeave={this.paginationActivation()}
          onClick={() => {
            this.setState({
              dataRange: [0, 20],
              activePage: 1,
              nPerPage: 20,
              paginationChange: !this.state.paginationChange,
            });
          }}
          className="dashboardPaginationStyle"
        >
          x20
        </Dropdown.Item>
        <Dropdown.Item
          onMouseLeave={this.paginationActivation()}
          onClick={() => {
            this.setState({
              dataRange: [0, 30],
              activePage: 1,
              nPerPage: 30,
              paginationChange: !this.state.paginationChange,
            });
          }}
          className="dashboardPaginationStyle"
        >
          x30
        </Dropdown.Item>
      </DropdownButton>
    );
  };
  paginationActivation = () => {
    if (this.state.paginationChange) {
      this.dashbordDataBuildInit();
      this.setState({ paginationChange: !this.state.paginationChange });
    }
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
            <Modal.Title>
              <img
                className="dashboardModalLogo"
                src="/images/logo-icone.png"
              ></img>{" "}
              Gestion des champs
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.modalListField()}</Modal.Body>
          <Modal.Footer>
            <Button
              className="dashboardFilterText dashBoardAlertButton"
              variant="secondary"
              onClick={handleClose}
            >
              Fermer
            </Button>
            <Button
              className="dashboardFilterText dashBoardModalButton1"
              variant="primary"
              onClick={this.newHeaderColumn}
            >
              Sauvegarder
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  //---------------------------------------------
  // Afficahge de la modale de gestion des colonnes
  // Display of the column management mode
  modalListField = () => {
    return (
      <div className="dashboardModalList">
        <Form.Group
          className="dashboardModalListWidth"
          controlId="exampleForm.ControlSelect2"
        >
          <Form.Label className="dashboardModalText">
            Champs disponibles
          </Form.Label>
          <Form.Control
            className="dashboardModalListHeight"
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
          <Form.Label className="dashboardModalText ">
            Champs affichés
          </Form.Label>
          <Form.Control
            className="dashboardModalListHeight"
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
  //---------------------------------------------
  // Affichage du contenu des listes de champs
  // Displaying the content of field lists
  modalListShow = (list) => {
    return list.map((element) => {
      return <option className="dashboardInputText">{element}</option>;
    });
  };
  //---------------------------------------------
  // Lance calcul nouveau header
  //
  newHeaderColumn = () => {
    console.log("newHeaderColumn");
    let dashboardColumnListInit = this.state.dashboardColumnListInit[0];
    let currentList = this.state.currentList;
    let dashboardNewColumn = ["_id", "memberActive"];
    let dashboardNewObjet = { _id: "Identifiant", memberActive: "actif" };
    let dashboardColumnListShow = [];
    //Récupération des clés de la liste curante
    currentList.forEach((element) => {
      for (let i in dashboardColumnListInit) {
        if (dashboardColumnListInit[i] === element) {
          dashboardNewColumn.push(i);
          dashboardNewObjet[i] = element;
        }
      }
    });
    dashboardColumnListShow.push(dashboardNewObjet);

    //Création de la nouvelle liste
    let membershipData = this.state.membershipData;
    let dataList = [];
    membershipData.forEach((elementData) => {
      let dataObject = {};
      dashboardNewColumn.forEach((elementkey) => {
        if (elementData[elementkey]) {
          dataObject[elementkey] = elementData[elementkey];
        }
      });
      dataList.push(dataObject);
    });
    //Pagination
    let first = 0;
    let last = this.state.nPerPage;

    console.log(dashboardColumnListInit);
    console.log(currentList);
    console.log(dashboardNewColumn);
    console.log(dataList);
    console.log(dashboardNewObjet);
    console.log(this.state.membershipColumFilterData);
    this.setState({
      membershipFilterPaginationData: dataList.slice(first, last),
      membershipFilterList: dataList,
      membershipColumFilterData: dataList,
      dashboardColumnListShow: dashboardColumnListShow,
      activePage: 1,
      dataRange: [0, this.state.nPerPage],
      membershipNumber: dataList.length,
      modalColumnListShow: false,
    });
  };
  //---------------------------------------------
  // calcul des champs à enlever
  // calculation of the fields to be removed
  subData = (e) => {
    let field = e.target.value;
    let currentList = this.state.currentList;
    let remainingList = this.state.remainingList;
    for (let i = 0; i < currentList.length; i++) {
      if (currentList[i] == field) {
        currentList.splice(i, 1);
        remainingList.push(field);
        remainingList.sort();
        break;
      }
    }
    this.setState({ currentList: currentList, remainingList: remainingList });
  };
  //---------------------------------------------
  // calcul des champs à ajouter
  // calculation of fields to add
  addData = (e) => {
    let field = e.target.value;
    let currentList = this.state.currentList;
    let remainingList = this.state.remainingList;
    for (let i = 0; i < remainingList.length; i++) {
      if (remainingList[i] == field) {
        remainingList.splice(i, 1);
        currentList.push(field);
        break;
      }
    }
    this.setState({ currentList: currentList, remainingList: remainingList });
  };
  //---------------------------------------------
  // suppréssion des données du localStorage
  // -
  disconnect = () => {
    localStorage.removeItem("_id");
    localStorage.removeItem("token");
    localStorage.removeItem("statut");
    localStorage.removeItem("_idMembership");
    this.setState({ redirectAccueil: true });
  };
  redirectDeconnexion = () => {
    if (this.state.redirectAccueil) {
      return <Redirect to="/" />;
    }
  };
  //---------------------------------------------
  // Lance l'affichage uniquement lorsque les données sont chargées
  // Starts display only when data is loaded
  init = () => {
    if (this.state.dataRange) {
      console.log("affichage");
      return (
        <Container className="dashboardGlobalSize">
          <div className="dashboardDeconnexionButton">
            <button
              onClick={this.disconnect}
              className="dashboardDeconnexionSize"
            >
              <i class="fas fa-2x fa-sign-out-alt dashboardDeconnexionIcon"></i>
            </button>
          </div>
          <div className="dashboardAlignButton">
            <div className="dashboardPaginationRow">
              <div className="dashboardFilter">{this.inputFilterTable()}</div>
              <div className="dashboardPaginationDivSize">
                {this.paginationChoise()}
              </div>
              <div>{this.paginationTable()}</div>
            </div>
            <div>{this.modalColumnList()}</div>
          </div>
          <p className="dashboardCounterText">
            Affichage x {this.state.nPerPage} - Nombre de membres trouvé :{" "}
            {this.state.membershipNumber}
          </p>
          <div>
            <Table
              striped
              bordered
              hover
              responsive
              className="dashBoardTableHeight"
            >
              <thead>{this.headerTable()}</thead>
              <tbody>{this.dataTable()}</tbody>
            </Table>
          </div>
          {this.alertShow()}
          {this.redirectDeconnexion()}
        </Container>
      );
    }
  };

  render() {
    return <div>{this.init()}</div>;
  }
}

export default MembershipList;
