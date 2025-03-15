import e, { Router } from 'express';
import { getCustomers } from './db/queries/customer';
import { getTopCustomers } from './service';

export const router = Router();

router.get('/customers', async (req, res) => {
    const customers = await getCustomers();
    res.json(customers);
});

router.get('/top-customers', async (req, res) => {
    try {
        const { country } = req.query;
        const topCustomers = await getTopCustomers(country as string);
        res.json(topCustomers);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

export default router;
