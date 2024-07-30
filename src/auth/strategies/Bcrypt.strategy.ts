import * as bcrypt from 'bcrypt';
import { IHashingStrategy } from '../interfaces/Ihashing.strategy';

export class BcryptStrategy implements IHashingStrategy {
  createSalt(): string {
    return bcrypt.genSaltSync();
  }

  hashPassword(password: string, salt: string): string {
    return bcrypt.hashSync(password, salt);
  }

  verifyPassword(
    typedPassword: string,
    salt: string,
    savedPassword: string,
    options?: any,
  ): boolean {
    return bcrypt.compareSync(typedPassword, savedPassword);
  }
}
