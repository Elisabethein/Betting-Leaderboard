import type { DatabaseCustomer, LeaderboardCustomer } from "./types";

export async function fetchCustomers(): Promise<DatabaseCustomer[]> {
    try {
        const customers = await fetch('http://localhost:3000/customers', { method: 'GET' })
        return customers.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function fetchTopCustomers(country?: string): Promise<LeaderboardCustomer[]> {
    try {
        const url = country ? `http://localhost:3000/top-customers?country=${country}` : 'http://localhost:3000/top-customers';
        const topCustomers = await fetch(url, { method: 'GET' });
        const data = await topCustomers.json();
        return data.map((customer: any) => ({
            name: customer.name,
            country: customer.country,
            totalBets: customer.totalBets,
            winRate: customer.winRate,
            profit: customer.profit
        }))
    } catch (error) {
        console.error(error);
        return [];
    }
}