import { NextFunction, Request, Response } from 'express';
import connection from '../models/connection';
import UserModel from '../models/user.model';

const errors = [
  '"username" is required',
  '"username" must be a string',
  '"username" length must be at least 3 characters long',
  '"classe" is required',
  '"classe" must be a string',
  '"classe" length must be at least 3 characters long',
  '"level" is required',
  '"level" must be a number',
  '"level" must be greater than or equal to 1',
  '"password" is required',
  '"password" must be a string',
  '"password" length must be at least 8 characters long',
];

const validationUser = async (req: Request, res: Response, next: NextFunction) => {
  const model = new UserModel(connection);
  const { username, password } = req.body;

  if (username === undefined) return res.status(400).json({ message: '"username" is required' });
  if (password === undefined) return res.status(400).json({ message: '"password" is required' });

  const login = await model.login(username, password);
  
  if (!login) return res.status(401).json({ message: 'Username or password invalid' });

  next();
};

export const validationUsername = (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.body;
  if (username === undefined) return res.status(400).json({ message: errors[0] });
  if (typeof username !== 'string') return res.status(422).json({ message: errors[1] });
  if (username.length <= 2) return res.status(422).json({ message: errors[2] });
  next();
};

export const validationClasse = (req: Request, res: Response, next: NextFunction) => {
  const { classe } = req.body;
  if (classe === undefined) return res.status(400).json({ message: errors[3] });
  if (typeof classe !== 'string') return res.status(422).json({ message: errors[4] });
  if (classe.length <= 2) return res.status(422).json({ message: errors[5] });
  next();
};

export const validationLevel = (req: Request, res: Response, next: NextFunction) => {
  const { level } = req.body;
  if (level === undefined) return res.status(400).json({ message: errors[6] });
  if (typeof level !== 'number') return res.status(422).json({ message: errors[7] });
  if (level <= 0) return res.status(422).json({ message: errors[8] });
  next();
};

export const validationPassword = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;
  if (password === undefined) return res.status(400).json({ message: errors[9] });
  if (typeof password !== 'string') return res.status(422).json({ message: errors[10] });
  if (password.length <= 8) return res.status(422).json({ message: errors[11] });
  next();
};

export default validationUser;