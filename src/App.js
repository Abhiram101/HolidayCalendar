// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { CountryProvider } from "./context/CountiesContext.js"; // ✅ Import

function App() {
  return (
    <CountryProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </CountryProvider>
  );
}

export default App;
