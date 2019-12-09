import { Router, Request, Response } from 'express';
import {  getAllUsers } from '../controllers/users';
const usersRoute = Router();

usersRoute.get('', getAllUsers);

export default usersRoute;
