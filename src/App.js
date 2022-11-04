import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Home from './components/Home'
import Header from './components/Header'
import Coins from './components/Coins'
import Exchanges from './components/Exchanges'
import Coindetail from './components/Coindetail'
import Footer from './components/Footer'

import "./styles/App.scss"
import "./styles/Header.scss"
import "./styles/Exchanges.scss"
import "./styles/Coins.scss"
import "./styles/Loader.scss"
import "./styles/Error.scss"
import "./styles/Coindetail.scss"
import "./styles/Chart.scss"
import "./styles/Home.scss"
import "./styles/Footer.scss"

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coins" element={<Coins />} />
        <Route path="/exchanges" element={<Exchanges />} />
        <Route path="/coin/:id" element={<Coindetail />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
