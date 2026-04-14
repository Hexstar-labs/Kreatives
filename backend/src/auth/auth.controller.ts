import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { publicKey: string; signature: string }) {
    const isValid = await this.authService.validateStellarSignature(
      body.publicKey,
      body.signature,
    );
    
    if (!isValid) {
      throw new Error('Invalid signature');
    }
    
    return this.authService.login(body.publicKey);
  }
}
