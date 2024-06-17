import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Components/Header";
import NavBar from "./Components/NavBar";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="title">
        <Header />
        <div className="nav-bar">
          <NavBar />
        </div>
      </div>
    </Router>
  );
}

export default App;
