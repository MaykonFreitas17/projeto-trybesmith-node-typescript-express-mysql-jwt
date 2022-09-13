import connection from '../models/connection';
import OrderModel from '../models/order.model';
import ProductModel from '../models/product.model';
// import Order from '../interfaces/order.interface';

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
    return result;
  }
}

export default OrderService;