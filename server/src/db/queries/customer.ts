import { db } from '../knex';

export const getCustomers = () => db('customer').select('*');

export const getCustomersByCountry = (country: string) => db('customer').select('*').where('country', country);