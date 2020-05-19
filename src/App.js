import React, { Component } from "react";
//Import style
import "bootstrap/dist/css/bootstrap.min.css";
// Import des components
import MembersCard from "./components/membersCard/MembersCard";
import SearchBar from "./components/membersCard/searchBar/SearchBar";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Dashboard from "./components/dashboard/Dashboard";
import Profil from "./components/profil/Profil";
import Formulaire from "./components/formulaire_inscription/formulaire"

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <div>
          <Switch>
            <Route path="/" exact>
              <SearchBar />
              <MembersCard />
            </Route>
            <Route path="/profil">
              <Profil/>
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/inscription">
              <Formulaire/>
            </Route>
          </Switch> 
        </div>
        <Footer />
      </Router>
    );
  }
}

export default App;
