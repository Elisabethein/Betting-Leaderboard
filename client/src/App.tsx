import leaderbordLogo from "/leaderboard.png";
import "./App.css";
import { useEffect, useState } from "react";
import { fetchTopCustomers } from "./requests";
import type { LeaderboardCustomer, CustomerCountry } from "./types";
import { CountrySelector } from "./CountrySelector";
import { LeaderboardTable } from "./LeaderboardTable";

function App() {
  const [customers, setCustomers] = useState<LeaderboardCustomer[]>([]);
  const [country, setCountry] = useState<CustomerCountry | "All">("All");

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

      <CountrySelector selectedCountry={country} onChange={setCountry} />

      <LeaderboardTable customers={customers} />
    </>
  );
}

export default App;
