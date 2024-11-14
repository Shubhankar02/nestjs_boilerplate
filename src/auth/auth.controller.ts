import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { Response } from 'express';
import { FacebookAuthService } from './facebook-auth.service';
import { AuthService } from './auth.service';
import { UseAuthStrategyInterceptor } from './decorators/auth-strategy.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly googleAuthService: GoogleAuthService,
    private readonly facebookAuthService: FacebookAuthService,
    private authService: AuthService,
  ) {}

  @Get('google')
  async googleAuth(@Res() res: Response) {
    const url = this.googleAuthService.getAuthUrl();
    return res.redirect(url);
  }

  @Get('google/callback')
  async googleAuthCallback(@Query('code') code: string, @Res() res: Response) {
    await this.googleAuthService.getTokens(code);
    const userInfo = await this.googleAuthService.getUserInfo();
    // Here you can handle the user information (e.g., create or update a user in the database)
    // For simplicity, we'll just return the user info as a JSON response
    return res.json(userInfo);
  }

  @Get('facebook')
  async facebookAuth(@Res() res: Response) {
    const url = this.facebookAuthService.getAuthUrl();
    return res.redirect(url);
  }

  @Get('facebook/callback')
  async facebookAuthCallback(
    @Query('code') code: string,
    @Res() res: Response,
  ) {
    const tokens = await this.facebookAuthService.getTokens(code);
    const userInfo = await this.facebookAuthService.getUserInfo(
      tokens.access_token,
    );
    // Here you can handle the user information (e.g., create or update a user in the database)
    // For simplicity, we'll just return the user info as a JSON response
    return res.json(userInfo);
  }

  @Post('local/register')
  @UseAuthStrategyInterceptor('pbkdf2') // or 'bcrypt' as needed
  // @AuthStrategy('bcrypt') // // Use BcryptStrategy for registration
  async register(@Body() body: { username: string; password: string }) {
    try {
      const salt = this.authService.createSalt();
      const hashedPassword = this.authService.hashPassword(body.password, salt);
      // Save the username, salt, and hashedPassword to the database (implementation depends on your database setup)
      return { message: 'User registered successfully' };
    } catch (err) {
      console.log('error', err);
    }
  }

  @Post('local/login')
  @UseAuthStrategyInterceptor('pbkdf2') // or 'bcrypt' as needed
  async login(@Body() body: { username: string; password: string }) {
    // Retrieve the user record from the database using the username (implementation depends on your database setup)
    const user = {
      salt: 'user-salt-from-db',
      password: 'hashed-password-from-db',
    }; // Example user data
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = this.authService.verifyPassword(
      body.password,
      user.salt,
      user.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }
    return { message: 'Login successful' };
  }
}
