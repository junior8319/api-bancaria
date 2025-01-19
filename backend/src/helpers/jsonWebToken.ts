import * as jwt from 'jsonwebtoken';
import * as fileSystem from 'fs/promises';
import IToken from '../interfaces/TokenData';

class JsonWebToken {
  jwt = jwt;

  static secret = async () => fileSystem.readFile('jwt.evaluation.key', 'utf8');

  static config: jwt.SignOptions = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  public async generate(payload: IToken): Promise<string | null> {
    try {
      const secret = await JsonWebToken.secret();
      const token = this.jwt.sign(payload, secret, JsonWebToken.config);

      return token;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public async verify(token: string): Promise<IToken | null> {
    try {
      const secret = await JsonWebToken.secret();
      const decoded = this.jwt.verify(token, secret, JsonWebToken.config);

      return decoded as IToken;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}

export default new JsonWebToken();
