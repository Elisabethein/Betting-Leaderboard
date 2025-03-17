import type { LeaderboardCustomer } from "./types";

interface LeaderboardTableProps {
  customers: LeaderboardCustomer[];
}

export function LeaderboardTable({ customers }: LeaderboardTableProps) {
  return (
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
  );
}
