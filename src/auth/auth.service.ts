import { Injectable } from '@nestjs/common';
import { Pbkdf2Strategy } from './strategies/Pbkdf2.strategy';
import { IHashingStrategy } from './interfaces/Ihashing.strategy';

@Injectable()
export class AuthService {
  private strategy: IHashingStrategy;

  constructor() {
    this.strategy = new Pbkdf2Strategy(); // Default to Pbkdf2
  }

  setStrategy(strategy: IHashingStrategy) {
    this.strategy = strategy;
  }

  /**
   * Create a salt
   * @returns The generated salt
   */
  createSalt(): string {
    return this.strategy.createSalt();
  }

  /**
   * Hash a password with the provided salt and options
   * @param password - The password to hash
   * @param salt - The salt to use
   * @param options - Additional options for hashing
   * @returns The hashed password
   */
  hashPassword(password: string, salt: string, options?: any): string {
    return this.strategy.hashPassword(password, salt, options);
  }

  /**
   * Verify a password by comparing it with the stored hashed password
   * @param typedPassword - The password provided by the user
   * @param salt - The salt used to hash the stored password
   * @param savedPassword - The stored hashed password
   * @param options - Additional options for verification
   * @returns True if the password is valid, otherwise false
   */
  verifyPassword(
    typedPassword: string,
    salt: string,
    savedPassword: string,
    options?: any,
  ): boolean {
    return this.strategy.verifyPassword(
      typedPassword,
      salt,
      savedPassword,
      options,
    );
  }
}
