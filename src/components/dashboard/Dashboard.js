import React, { Component } from "react";
//Import module component
import MembershipList from "./MembershipList";
import Graphe from "./Graphe";

class Dashboard extends Component {
  render() {
    return (
      <div>
        {"NavBarre + logo + déconnexion"}
        <Graphe />
        <MembershipList />
      </div>
    );
  }
}

export default Dashboard;
