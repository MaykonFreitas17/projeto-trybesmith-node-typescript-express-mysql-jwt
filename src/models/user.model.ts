import { Pool, ResultSetHeader } from 'mysql2/promise';
import User from '../interfaces/user.interface';

class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async login(username: string, password: string): Promise<User> {
    const result = await this.connection.execute(
      'SELECT * FROM users WHERE username=? AND password=?',
      [username, password],
    );
    const [rows] = result;
    const [user] = rows as User[];
    return user;
  }

  public async create(user: User): Promise<User> {
    const { username, classe, level, password } = user;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
      [username, classe, level, password],
    );
    const [dataInsert] = result;
    const { insertId } = dataInsert;
    return { id: insertId, ...user };
  }
}

export default UserModel;