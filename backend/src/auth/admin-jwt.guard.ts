// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import type { Request } from 'express';

// interface AccessTokenPayload {
//   sub: string;
//   accountType: string;
// }

// @Injectable()
// export class AdminJwtGuard implements CanActivate {
//   constructor(private readonly jwt: JwtService) {}

//   async canActivate(context: ExecutionContext) {
//     const request = context.switchToHttp().getRequest<Request>();
//     const authorization = request.headers.authorization;
//     const token = authorization?.startsWith('Bearer ')
//       ? authorization.slice('Bearer '.length)
//       : undefined;

//     if (!token) throw new UnauthorizedException('A bearer access token is required.');

//     try {
//       const payload = await this.jwt.verifyAsync<AccessTokenPayload>(token);
//       if (payload.accountType !== 'ADMIN') {
//         throw new UnauthorizedException('Administrator access is required.');
//       }
//       return true;
//     } catch {
//       throw new UnauthorizedException('A valid administrator access token is required.');
//     }
//   }
// }