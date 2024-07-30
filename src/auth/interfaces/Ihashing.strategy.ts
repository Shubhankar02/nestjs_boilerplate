export interface IHashingStrategy {
  createSalt(): string;

  hashPassword(password: string, salt: string, options?: any): string;

  verifyPassword(
    typedPassword: string,
    salt: string,
    savedPassword: string,
    options?: any,
  ): boolean;
}
