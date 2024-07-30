import { randomBytes, pbkdf2Sync } from 'crypto';
import { IHashingStrategy } from '../interfaces/Ihashing.strategy';

export class Pbkdf2Strategy implements IHashingStrategy {
  createSalt(): string {
    return randomBytes(16).toString('hex');
  }

  hashPassword(password: string, salt: string, options?: any): string {
    const {
      iterations = 10000,
      keyLen = 64,
      digest = 'sha512',
      encoding = 'hex',
    } = options || {};
    return pbkdf2Sync(password, salt, iterations, keyLen, digest).toString(
      encoding,
    );
  }

  verifyPassword(
    typedPassword: string,
    salt: string,
    savedPassword: string,
    options?: any,
  ): boolean {
    const hashedTypedPassword = this.hashPassword(typedPassword, salt, options);
    return hashedTypedPassword === savedPassword;
  }
}
