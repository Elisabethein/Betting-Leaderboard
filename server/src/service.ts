import { getCustomers } from './db/queries/customer';
import { getBets } from './db/queries/bets';

export async function getTopCustomers(country?: string) {
    const customers = await getCustomers();
    const bets = await getBets();

    const betsByCustomerId = bets.reduce((acc, bet) => {
        if (!acc[bet.customer_id]) {
            acc[bet.customer_id] = [];
        }
        acc[bet.customer_id].push(bet);
        return acc;
    }, {} as Record<string, typeof bets>);

    const topCustomers = customers.map(customer => {
        const customerBets = betsByCustomerId[customer.id] || [];

        const totalBets = customerBets.filter(bet => bet.status === 'WON' || bet.status === 'LOST');
        const totalWins = customerBets.filter(bet => bet.status === 'WON');
        const totalLosses = customerBets.filter(bet => bet.status === 'LOST');

        const winRate = totalBets.length > 0 ? totalWins.length / totalBets.length * 100 : 0;

        const totalWinnings = totalWins.reduce((acc, bet) => acc + bet.stake * bet.odds - bet.stake, 0);
        const totalLoss = totalLosses.reduce((acc, bet) => acc + bet.stake, 0);
        const profit = totalWinnings - totalLoss;

        return {
            name: `${customer.first_name} ${customer.last_name}`,
            country: customer.country,
            totalBets: totalBets.length,
            winRate: parseFloat(winRate.toFixed(2)),
            profit: parseFloat(profit.toFixed(2)),
        };
    })

    const filteredTopCustomers = topCustomers.filter(customer => customer.profit >= 0);

    if (country) {
        return filteredTopCustomers.filter(customer => customer.country === country).sort((a, b) => b.profit - a.profit).slice(0, 10);
    }

    return filteredTopCustomers.sort((a, b) => b.profit - a.profit).slice(0, 10);
}