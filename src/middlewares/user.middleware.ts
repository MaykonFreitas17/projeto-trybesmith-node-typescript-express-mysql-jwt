import { NextFunction, Request, Response } from 'express';
import connection from '../models/connection';
import UserModel from '../models/user.model';

const validationUser = async (req: Request, res: Response, next: NextFunction) => {
  const model = new UserModel(connection);
  const { username, password } = req.body;

  if (username === undefined) return res.status(400).json({ message: '"username" is required' });
  if (password === undefined) return res.status(400).json({ message: '"password" is required' });

  const login = await model.login(username, password);

  console.log(login);
  
  if (!login) return res.status(401).json({ message: 'Username or password invalid' });

  next();
};

export default validationUser;