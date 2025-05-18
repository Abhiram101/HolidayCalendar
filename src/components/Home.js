import React, { useState, useContext, useEffect } from "react";
import CountrySelector from "./CountrySelector";
import MonthView from "./MonthView";
import QuarterView from "./QuarterView";
import "../styles/Home.css";
import { CountryContext } from "../context/CountiesContext.js";

const Home = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const { countries, loading } = useContext(CountryContext);
  const [viewMode, setViewMode] = useState("monthly");

  useEffect(() => {
    if (!loading && countries.length > 0 && !selectedCountry) {
      setSelectedCountry(countries[0]);
    }
  }, [loading, countries, selectedCountry]);

  if (loading || !selectedCountry) {
    return <p>Loading countries...</p>;
  }

  return (
    <div className="home-container">
      <h1 className="home-title">World Holiday Calendar </h1>

      <div className="controls-wrapper">
        <CountrySelector
          selectedCountry={selectedCountry}
          onChange={setSelectedCountry}
        />
        <div className="view-controls">
          <button onClick={() => setViewMode("monthly")}>Monthly View</button>
          <button onClick={() => setViewMode("quarterly")}>
            Quarterly View{" "}
          </button>
        </div>
      </div>

      {viewMode === "monthly" ? (
        <MonthView selectedCountry={selectedCountry} />
      ) : (
        <QuarterView selectedCountry={selectedCountry} />
      )}
    </div>
  );
};

export default Home;
