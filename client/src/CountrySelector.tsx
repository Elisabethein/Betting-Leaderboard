import type { CustomerCountry } from "./types";

interface CountrySelectorProps {
  selectedCountry: CustomerCountry | "All";
  onChange: (country: CustomerCountry | "All") => void;
}

export function CountrySelector({ selectedCountry, onChange }: CountrySelectorProps) {
  const countries: (CustomerCountry | "All")[] = ["All", "Estonia", "Finland", "Norway", "Chile", "Canada"];

  return (
    <div className="country-selector">
      <label htmlFor="country">Select country:</label>
      <select id="country" value={selectedCountry} onChange={(e) => onChange(e.target.value as CustomerCountry | "All")}>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
}
