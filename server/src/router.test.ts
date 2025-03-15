import request from 'supertest';
import express from 'express';
import router from '../src/router';
import { getCustomers } from '../src/db/queries/customer';
import { getTopCustomers } from '../src/service';

jest.mock('../src/db/queries/customer');
jest.mock('../src/service');

const app = express();
app.use(express.json());
app.use(router);

describe('API tests', () => {

    it('GET /customers should return customers', async () => {
        const mockCustomers = [
            { id: '1', first_name: 'John', last_name: 'Doe', country: 'US' },
            { id: '2', first_name: 'Jane', last_name: 'Doe', country: 'UK' },
        ];
        (getCustomers as jest.Mock).mockResolvedValue(mockCustomers);

        const response = await request(app).get('/customers');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockCustomers);
    });

    it('GET /top-customers should return top customers with only positive profit', async () => {
        const mockTopCustomers = [
            { name: 'John Doe', country: 'US', totalBets: 10, winRate: 50, profit: 300 },
            { name: 'Jane Doe', country: 'UK', totalBets: 20, winRate: 60, profit: 200 },
            { name: 'Alice Doe', country: 'US', totalBets: 30, winRate: 70, profit: -100 },
        ];
        (getTopCustomers as jest.Mock).mockResolvedValue(mockTopCustomers.filter(customer => customer.profit >= 0));

        const response = await request(app).get('/top-customers');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockTopCustomers.filter(customer => customer.profit >= 0));
    });

    it("GET /top-customers should return an empty array when no customers are found", async () => {
        (getTopCustomers as jest.Mock).mockResolvedValue([]);

        const response = await request(app).get('/top-customers');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    it('GET /top-customers?country=Estonia should return top customers from Estonia', async () => {
        const mockTopCustomers = [
            { name: 'John Doe', country: 'Estonia', totalBets: 10, winRate: 50, profit: 300 },
            { name: 'Jane Doe', country: 'Finland', totalBets: 20, winRate: 60, profit: 200 },
        ];
        (getTopCustomers as jest.Mock).mockResolvedValue(mockTopCustomers.filter(customer => customer.country === 'Estonia'));

        const response = await request(app).get('/top-customers?country=Estonia');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockTopCustomers.filter(customer => customer.country === 'Estonia'));
    });

    it("GET /top-customers?country=Estonia should return an empty array when no customers are found", async () => {
        (getTopCustomers as jest.Mock).mockResolvedValue([]);

        const response = await request(app).get('/top-customers?country=Estonia');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    it('GET /top-customers should return an error when service throws an error', async () => {
        (getTopCustomers as jest.Mock).mockRejectedValue(new Error('Internal server error'));

        const response = await request(app).get('/top-customers');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal server error' });
    });

    it('GET /top-customers?country=Estonia should return an error when service throws an error', async () => {
        (getTopCustomers as jest.Mock).mockRejectedValue(new Error('Internal server error'));

        const response = await request(app).get('/top-customers?country=Estonia');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal server error' });
    });

});