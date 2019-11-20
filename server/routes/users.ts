import { Router, Request, Response } from 'express';

const usersRoute = Router();

usersRoute.get('', (req: Request, res: Response) => {
  return res.send('Heeeeeeeeeeeeehehehehehe');
});

export default usersRoute;
