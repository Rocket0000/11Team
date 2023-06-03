import React from "react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";

import "./styles/App.css";
import DatePickerBox from "./components/common/DatePickerBox/DatePickerBox";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/"></Route>
          <Route path="/login"></Route>
          <Route path="/register"></Route>
          <Route path="/mypage"></Route>
          <Route path="/soccer"></Route>
          <Route path="/baseball"></Route>
          <Route path="/esport"></Route>
          <Route path="/shorts"></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
