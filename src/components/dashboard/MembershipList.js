import React, { Component } from "react";
import { Container } from "react-bootstrap";
//Import Bootstrap - table
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
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
      dashboardColumnListShow: [],
      dashboardColumnListKey: [],
      dashboardColumnListHeader: [],
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
    let dashboardListKey = Object.keys(dashboardJsonDataShow[0]);
    let dashboardListHeader = Object.values(dashboardJsonDataShow[0]);
    this.setState({
      membershipData: membershipsJsonData,
      dashboardColumnListInit: dashboardJsonDataInit,
      dashboardColumnListShow: dashboardJsonDataShow,
      dashboardColumnListKey: dashboardListKey,
      dashboardColumnListHeader: dashboardListHeader,
    });
  };
  //---------------------------------------------

  // Extractions des données de la base MongoDB:
  // Data extraction from the MongoDB database
  //
  //
  //
  //---------------------------------------------

  tableSearch = () => {
    return (
      <Container className="marginBottom">
        <BootstrapTable
          data={this.state.membershipData}
          search={true}
          pagination
          scrollTop={"Bottom"}
        >
          <TableHeaderColumn
            dataField={"membershipNumber"}
            isKey
            searchable={false}
            width="150"
          >
            membershipNumber
          </TableHeaderColumn>
          <TableHeaderColumn
            dataSort={true}
            width="150"
            dataField="compagnyRepresentName"
          >
            compagnyRepresentName
          </TableHeaderColumn>
          <TableHeaderColumn
            dataSort={true}
            width="150"
            dataField="compagnyRepresentName"
          >
            compagnyRepresentName
          </TableHeaderColumn>
          <TableHeaderColumn
            dataSort={true}
            width="150"
            dataField="compagnyEmail"
          >
            compagnyEmail
          </TableHeaderColumn>
          <TableHeaderColumn
            dataSort={true}
            width="150"
            dataField="compagnyRepresentName"
          >
            compagnyRepresentName
          </TableHeaderColumn>
          <TableHeaderColumn
            dataSort={true}
            width="150"
            dataField="compagnyRepresentName"
          >
            compagnyRepresentName
          </TableHeaderColumn>
        </BootstrapTable>
      </Container>
    );
  };

  render() {
    return <div>{this.tableSearch()}</div>;
  }
}

/*{this.tableSearch()}*/
export default MembershipList;
