import React, { Component } from "react";
//Import module component
import "bootstrap/dist/css/bootstrap.min.css";
import MembershipList from "./MembershipList";
import Test1 from "./Test1";
import Graphe from "./Graphe";
import { Button } from "react-bootstrap";
class Dashboard extends Component {
  render() {
    return (
      <div className="dashBoardMargin">
        <MembershipList />
      </div>
    );
  }
}

export default Dashboard;
