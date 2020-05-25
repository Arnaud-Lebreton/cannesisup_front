import React, { Component } from "react";
//Import style
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// Import des components
import MembersCard from "./components/membersCard/MembersCard";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Dashboard from "./components/dashboard/Dashboard";
import Profil from "./components/profil/Profil";
import Formulaire from "./components/formulaire_inscription/formulaire";
import Login from "./components/login/Login";
import InitPassword from "./components/login/InitPassword";

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <div>
          <Switch>
            <Route path="/" exact>
              <MembersCard />
            </Route>
            <Route path="/profil" component={Profil}></Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/initpassword">
              <InitPassword />
            </Route>
            <Route path="/inscription">
              <Formulaire />
            </Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    );
  }
}

export default App;
