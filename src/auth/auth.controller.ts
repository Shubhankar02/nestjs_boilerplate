import { Controller, Get, Query, Res } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { Response } from 'express';
import { FacebookAuthService } from './facebook-auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly googleAuthService: GoogleAuthService,
    private readonly facebookAuthService: FacebookAuthService,
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
}
