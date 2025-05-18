// src/context/CountryContext.js
import React, { createContext, useEffect, useState } from "react";
import { fetchAvailableCountries } from "../Utility/CalendarUtils.js";

export const CountryContext = createContext();

export const CountryProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const data = await fetchAvailableCountries();
        setCountries(data);
      } catch (error) {
        console.error("Failed to fetch country list:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCountries();
  }, []);

  return (
    <CountryContext.Provider value={{ countries, loading }}>
      {children}
    </CountryContext.Provider>
  );
};
