import React, { useEffect, useState } from "react";
import {
  Routes,
  BrowserRouter as Router,
  Route,
  useActionData,
} from "react-router-dom";

import "./styles/App.css";
import Header from "./components/common/Header/Header";
import Footer from "./components/common/Footer";
import LoginPage from "./pages/login";
import JoinPage from "./pages/join";
import SchedulePage from "./pages/SchedulePage";
import KlRecord from "./components/Record/KlRecord";
import KboRecord from "./components/Record/KboRecord";
import LoLRecord from "./components/Record/LoLRecord";
import MyWrite from "./pages/mypage/myWrite";
import MainPage from "./pages/Main/MainPage";
import Shorts from "./pages/shorts/shorts";
import SoccerPage from "./pages/Main/SoccerPage";
import BaseballPage from "./pages/Main/BaseballPage";
import EsportPage from "./pages/Main/EsportPage";
import List from "./pages/notice/List";
import Detail from "./pages/notice/Detail";
import Edit from "./pages/notice/Edit";
import MypageDetail from "./pages/notice/MypageDetail";
import Modify from "./pages/notice/Modify";
import StadiumPage from "./pages/StadiumPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/join" element={<JoinPage />}></Route>
          <Route path="/register" element={<JoinPage />}></Route>
          <Route path="/mypage">
            <Route path="myWrite" element={<MyWrite />} />
            <Route path="myPicture" element={<p>동영상 목록</p>} />
            <Route path="myInfo" element={<p>내정보</p>} />
          </Route>
          <Route path="/myWrite/notice/detail/:id" element={<MypageDetail />} />
          <Route path="/myWrite/notice/modify/:id" element={<Modify />} />
          <Route path="/:sports/schedule" element={<SchedulePage />}></Route>

          <Route path="/soccer" element={<SoccerPage />}></Route>
          <Route path="/soccer/record" element={<KlRecord />} />
          <Route path="/soccer/notice" element={<List />} />
          <Route path="/soccer/notice/edit" element={<Edit />} />
          <Route path="/soccer/notice/detail/:id" element={<Detail />} />

          <Route path="/baseball" element={<BaseballPage />}></Route>
          <Route path="/baseball/record" element={<KboRecord />} />
          <Route path="/baseball/notice" element={<List />} />
          <Route path="/baseball/notice/edit" element={<Edit />} />
          <Route path="/baseball/notice/detail/:id" element={<Detail />} />

          <Route path="/esport" element={<EsportPage />}></Route>
          <Route path="/esport/record" element={<LoLRecord />} />
          <Route path="/esport/notice" element={<List />} />
          <Route path="/esport/notice/edit" element={<Edit />} />
          <Route path="/esport/notice/detail/:id" element={<Detail />} />
          <Route path="/shorts" element={<Shorts />}></Route>
          <Route path="/stadium" element={<StadiumPage />}></Route>
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
