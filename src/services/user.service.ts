import { sign, SignOptions } from 'jsonwebtoken';
import connection from '../models/connection';
import UserModel from '../models/user.model';
import User from '../interfaces/user.interface';

const secret = 'JWT_SECRET';

class UserService {
  public model: UserModel;

  public jwtConfig: SignOptions;

  constructor() {
    this.model = new UserModel(connection);
    this.jwtConfig = {
      expiresIn: '8h',
      algorithm: 'HS256',
    };
  }

  public async login(username: string, password: string): Promise<object> {
    const payload = { username, password };
    const token = sign(payload, secret, this.jwtConfig);
    return { token };
  }

  public async create(user: User): Promise<object> {
    const userCreated = await this.model.create(user);
    const { username, password } = userCreated;
    const payload = { username, password };
    const token = sign(payload, secret, this.jwtConfig);
    return { token };
  }
}

export default UserService;