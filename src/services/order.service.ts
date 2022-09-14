import connection from '../models/connection';
import OrderModel from '../models/order.model';
import ProductModel from '../models/product.model';
// import Order from '../interfaces/order.interface';

const errors = [
  { message: '"productsIds" is required', code: 400 },
  { message: '"productsIds" must include only numbers', code: 422 },
  { message: '"productsIds" must be an array', code: 422 },
];

class OrderService {
  public model: OrderModel;

  public productModel: ProductModel;

  constructor() {
    this.model = new OrderModel(connection);
    this.productModel = new ProductModel(connection);
  }

  public async getAll(): Promise<object> {
    const orders = await this.model.getAll();
    const result = orders.map(async (order) => {
      const { id, userId } = order;
      const products = await this.productModel.getByOrderId(Number(id));
      const productsIds = products.map((product) => product.id);
      return { id, userId, productsIds };
    });
    return Promise.all(result);
  }

  public async create(userId: number, productsIds: Array<number>) {
    if (productsIds === undefined) return errors[0];
    if (productsIds.length === 0) return errors[1];
    if (typeof productsIds !== 'object') return errors[2];

    const orderCreated = await this.model.create({ userId });

    productsIds.forEach(async (productId: number) => {
      await this.productModel.update(productId, orderCreated);
    });

    return { userId, productsIds };
  }
}

export default OrderService;