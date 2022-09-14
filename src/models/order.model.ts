import { Pool, ResultSetHeader } from 'mysql2/promise';
import Order from '../interfaces/order.interface';

class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Order[]> {
    const result = await this.connection.execute(
      'SELECT * FROM Trybesmith.Orders',
    );
    const [rows] = result;
    return rows as Order[];
  }

  public async create(order: Order) {
    const { userId } = order;
    const [dataInsert] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
      [userId],
    );
    const { insertId } = dataInsert;
    return insertId;
  }
}

export default OrderModel;