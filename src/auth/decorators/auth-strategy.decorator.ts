import { SetMetadata } from '@nestjs/common';

export const STRATEGY_KEY = 'strategy';
export const UseAuthStrategyInterceptor = (strategy: 'pbkdf2' | 'bcrypt') =>
  SetMetadata(STRATEGY_KEY, strategy);
