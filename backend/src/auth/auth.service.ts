import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateStellarSignature(publicKey: string, signature: string): Promise<boolean> {
    // Simplified validation - full implementation would verify Stellar signature
    return publicKey && signature ? true : false;
  }

  async login(publicKey: string) {
    const payload = { sub: publicKey, publicKey };
    return {
      access_token: this.jwtService.sign(payload),
      publicKey,
    };
  }

  async verifyToken(token: string) {
    return this.jwtService.verify(token);
  }
}
