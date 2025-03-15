import e from 'express';
import { db } from '../knex';

export const getBets = () => db('bet').select('*');

export const getBetsByCustomerId = (customerId: string) => db('bet').select('*').where('customer_id', customerId);