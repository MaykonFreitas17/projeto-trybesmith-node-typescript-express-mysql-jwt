import { NextFunction, Request, Response } from 'express';

const errors = [
  '"name" is required',
  '"name" must be a string',
  '"name" length must be at least 3 characters long',
  '"amount" is required',
  '"amount" must be a string',
  '"amount" length must be at least 3 characters long',
];

const validationName = (name: string) => {
  if (name === undefined) return { message: errors[0], code: 400 };
  if (typeof name !== 'string') return { message: errors[1], code: 422 };
  if (name.length <= 2) return { message: errors[2], code: 422 };
};

const validationAmount = (amount: string) => {
  if (amount === undefined) return { message: errors[3], code: 400 };
  if (typeof amount !== 'string') return { message: errors[4], code: 422 };
  if (amount.length <= 2) return { message: errors[5], code: 422 };
};

const validationProduct = (req: Request, res: Response, next: NextFunction) => {
  const { name, amount } = req.body;
  const validateName = validationName(name);
  const validateAmount = validationAmount(amount);

  if (typeof validateName === 'object') {
    const { message, code } = validateName;
    return res.status(code).json({ message });
  }

  if (typeof validateAmount === 'object') {
    const { message, code } = validateAmount;
    return res.status(code).json({ message });
  }

  next();
};

export default validationProduct;
