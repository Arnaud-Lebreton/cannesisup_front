import React, { Component } from "react";
//Import module component
import MembershipList from "./MembershipList";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <MembershipList />
      </div>
    );
  }
}

export default Dashboard;
