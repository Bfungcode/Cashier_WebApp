import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Crud } from "./components/Crud";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crud" element={<Crud />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
