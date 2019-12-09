import { Request, Response } from 'express';
import { seed, getAll } from '../models/users';

export const getAllUsers = async (req: Request, res: Response) => {
  return res.send(await getAll());
};

export const seedUsers = async () => {
  const users = await getAll();
  if (users.length) {
    console.log('users table already populated.');
  } else {
    console.log('Populating users table...');
    seed();
  }
};
