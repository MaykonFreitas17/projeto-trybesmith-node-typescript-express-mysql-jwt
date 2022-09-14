import { NextFunction, Request, Response } from 'express';

const errors = [
  '"name" is required',
  '"name" must be a string',
  '"name" length must be at least 3 characters long',
  '"amount" is required',
  '"amount" must be a string',
  '"amount" length must be at least 3 characters long',
];

export const validationName = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  if (name === undefined) return res.status(400).json({ message: errors[0] });
  if (typeof name !== 'string') return res.status(422).json({ message: errors[1] });
  if (name.length <= 2) return res.status(422).json({ message: errors[2] });
  next();
};

export const validationAmount = (req: Request, res: Response, next: NextFunction) => {
  const { amount } = req.body;
  if (amount === undefined) return res.status(400).json({ message: errors[3] });
  if (typeof amount !== 'string') return res.status(422).json({ message: errors[4] });
  if (amount.length <= 2) return res.status(422).json({ message: errors[5] });
  next();
};
