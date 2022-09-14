import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import connection from '../models/connection';
import UserModel from '../models/user.model';

const secret = 'JWT_SECRET';

interface RequestWithUser extends Request {
  user?: number;
}

const model = new UserModel(connection);

const validationToken = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token not found' });
    const user = verify(token, secret);
    const payload = Object.values(user);
    const userId = await model.login(payload[0], payload[1]);
    req.user = userId.id;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default validationToken;
