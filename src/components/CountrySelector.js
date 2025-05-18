// CountrySelector.js
import React, { useContext } from "react";
import { CountryContext } from "../context/CountiesContext.js";

const CountrySelector = ({ selectedCountry, onChange }) => {
  const { countries, loading } = useContext(CountryContext);

  if (loading) return <p>Loading countries...</p>;

  const handleChange = (e) => {
    const selectedCode = e.target.value;
    const selected = countries.find((c) => c.countryCode === selectedCode);

    if (selected) {
      onChange(selected);
    } else {
      console.warn(
        `Selected country code '${selectedCode}' not found in list.`
      );
    }
  };

  return (
    <select value={selectedCountry.code} onChange={handleChange}>
      {countries.map((country) => (
        <option key={country.countryCode} value={country.countryCode}>
          {country.name}
        </option>
      ))}
    </select>
  );
};

export default CountrySelector;
