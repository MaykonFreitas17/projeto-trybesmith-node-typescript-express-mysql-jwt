import { NextFunction, Request, Response } from 'express';
import connection from '../models/connection';
import UserModel from '../models/user.model';

function validationUser(req: Request, res: Response, next: NextFunction) {
  const model = new UserModel(connection);
  const { username, password } = req.body;

  if (username === undefined) return res.status(400).json('"username" is required');
  if (password === undefined) return res.status(400).json('"password" is required');

  const login = model.login(username, password);

  if (!login) return res.status(401).json('Username or password invalid');

  next();
}

export default validationUser;