import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WsJwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const client = context.switchToWs().getClient();
    const token = client.handshake.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new WsException('Authentication token is missing');
    }

    try {
      const payload = this.jwtService.verify(token);
      context.switchToWs().getData().user = payload;
      return true;
    } catch (error) {
      throw new WsException('Invalid token');
    }
  }
}
