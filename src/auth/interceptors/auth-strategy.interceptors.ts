import {
  Injectable,
  ExecutionContext,
  CallHandler,
  NestInterceptor,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { BcryptStrategy } from '../strategies/Bcrypt.strategy';
import { Pbkdf2Strategy } from '../strategies/Pbkdf2.strategy';
import { STRATEGY_KEY } from '../decorators/auth-strategy.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthStrategyInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const handler = context.getHandler();
    const strategy = this.reflector.get<string>(STRATEGY_KEY, handler);

    if (strategy === 'bcrypt') {
      this.authService.setStrategy(new BcryptStrategy());
    } else {
      this.authService.setStrategy(new Pbkdf2Strategy());
    }

    return next.handle();
  }
}
