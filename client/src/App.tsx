import leaderbordLogo from "/leaderboard.png";
import "./App.css";
import { useEffect, useState } from "react";
import { fetchTopCustomers } from "./requests";
import type { LeaderboardCustomer, CustomerCountry } from "./types";

function App() {
  const [customers, setCustomers] = useState<LeaderboardCustomer[]>([]);
  const [country, setCountry] = useState<CustomerCountry | "All">("All");

  const countries: (CustomerCountry | "All")[] = ["All", "Estonia", "Finland", "Norway", "Chile", "Canada"];

  async function fetchLeaderboard(country?: CustomerCountry) {
    setCustomers(await fetchTopCustomers(country));
  }

  useEffect(() => {
    fetchLeaderboard(country !== "All" ? country : undefined);
  }, [country]);

  return (
    <>
      <div>
        <img src={leaderbordLogo} className="logo" alt="Leaderboard logo" />
      </div>
      <h1>Betting Leaderboard</h1>

      <div className="country-selector">
        <label htmlFor="country">Select country:</label>
        <select
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value as CustomerCountry | "All")}
        >
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Country</th>
            <th>Total Bets</th>
            <th>Win Rate (%)</th>
            <th>Profit (€)</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map((customer, index) => (
            <tr key={customer.name}>
              <td>{index + 1}</td>
              <td>{customer.name}</td>
              <td>{customer.country}</td>
              <td>{customer.totalBets}</td>
              <td>{customer.winRate}%</td>
              <td>{customer.profit}€</td>
            </tr>
          ))
          ) : (
            <tr>
              <td colSpan={6}>No customers found</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default App;
