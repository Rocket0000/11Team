import React from "react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";

import "./styles/App.css";

import LoginPage from "./pages/login";
import JoinPage from "./pages/join";
import KlRecord from "./pages/Record/KlRecord";
import KboRecord from "./pages/Record/KboRecord";
import LoLRecord from "./pages/Record/LoLRecord";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/"></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/join" element={<JoinPage />}></Route>
          <Route path="/register"></Route>
          <Route path="/mypage"></Route>
          <Route path="/soccer"></Route>
          <Route path="/soccer/record" element={<KlRecord />}></Route>
          <Route path="/baseball"></Route>
          <Route path="/baseball/record" element={<KboRecord />}></Route>
          <Route path="/esport"></Route>
          <Route path="/esport/record" element={<LoLRecord />}></Route>
          <Route path="/shorts"></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
