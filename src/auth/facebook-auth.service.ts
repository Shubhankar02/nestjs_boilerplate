import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class FacebookAuthService {
  private clientId: string = process.env.FACEBOOK_CLIENT_ID!;
  private clientSecret: string = process.env.FACEBOOK_CLIENT_SECRET!;
  private redirectUri: string = process.env.FACEBOOK_REDIRECT_URI!;

  getAuthUrl(): string {
    return `https://www.facebook.com/v12.0/dialog/oauth?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=email,public_profile`;
  }

  async getTokens(code: string): Promise<any> {
    const url = `https://graph.facebook.com/v12.0/oauth/access_token?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&client_secret=${this.clientSecret}&code=${code}`;
    const response = await axios.get(url);
    return response.data;
  }

  async getUserInfo(accessToken: string): Promise<any> {
    const url = `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`;
    const response = await axios.get(url);
    return response.data;
  }
}
