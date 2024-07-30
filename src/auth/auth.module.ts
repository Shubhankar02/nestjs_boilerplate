import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleAuthService } from './google-auth.service';
import { FacebookAuthService } from './facebook-auth.service';

@Module({
  controllers: [AuthController],
  providers: [GoogleAuthService, FacebookAuthService],
})
export class AuthModule {}
