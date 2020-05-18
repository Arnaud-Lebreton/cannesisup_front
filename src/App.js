import React, { Component } from "react";
//Import style
import "bootstrap/dist/css/bootstrap.min.css";
// Import des components
import MembersCard from "./components/membersCard/MembersCard";
import SearchBar from "./components/membersCard/searchBar/SearchBar";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Dashboard from "./components/dashboard/Dashboard";
import Profil from "./components/profil/Profil";

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <div>
          <SearchBar />
          <MembersCard />
          <Dashboard />
        </div>
        <div>
          <Profil/>
        </div>
        <Footer />
      </Router>
    );
  }
}

export default App;
