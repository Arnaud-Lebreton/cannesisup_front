import React, { Component } from "react";
//Import module component
import "bootstrap/dist/css/bootstrap.min.css";
import MembershipList from "./MembershipList";
import Graphe from "./Graphe";

class Dashboard extends Component {
  render() {
    return (
      <div className="dashBoardMargin">
        <Graphe />
        <MembershipList />
      </div>
    );
  }
}

export default Dashboard;
