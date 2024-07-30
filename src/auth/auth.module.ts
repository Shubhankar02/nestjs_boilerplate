import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleAuthService } from './google-auth.service';
import { FacebookAuthService } from './facebook-auth.service';
import { AuthService } from './auth.service';
import { AuthStrategyInterceptor } from './interceptors/auth-strategy.interceptors';
import { Reflector } from '@nestjs/core';

@Module({
  controllers: [AuthController],
  providers: [
    GoogleAuthService,
    FacebookAuthService,
    AuthService,
    AuthStrategyInterceptor,
    Reflector,
  ],
})
export class AuthModule {}
