import { Request, Response } from 'express';
import OrderService from '../services/order.service';

interface RequestWithUser extends Request {
  user?: number;
}

class OrderController {
  constructor(private orderService = new OrderService()) {}

  public getAll = async (req: Request, res: Response) => {
    const orders = await this.orderService.getAll();
    res.status(200).json(orders);
  };

  public create = async (req: RequestWithUser, res: Response) => {
    const { productsIds } = req.body;
    const userID = req.user;

    const orderCreatd = await this.orderService.create(Number(userID), productsIds);
    const erros = Object.keys(orderCreatd);

    if (erros.includes('message') || erros.includes('code')) {
      const values = Object.values(orderCreatd);
      const message = values[0];
      const code = Number(values[1]);
      return res.status(code).json({ message });
    }

    res.status(201).json(orderCreatd);
  };
}

export default OrderController;