import React, { Component } from "react";
import MembersCard from "./components/membersCard/MembersCard";
import SearchBar from "./components/membersCard/searchBar/SearchBar";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <div>
          <SearchBar />
          <MembersCard />
        </div>
      </Router>
    );
  }
}

export default App;
