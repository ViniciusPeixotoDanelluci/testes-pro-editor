var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, UnauthorizedException, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
let AdminJwtGuard = class AdminJwtGuard {
    jwt;
    constructor(jwt) {
        this.jwt = jwt;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authorization = request.headers.authorization;
        const token = authorization?.startsWith('Bearer ')
            ? authorization.slice('Bearer '.length)
            : undefined;
        if (!token)
            throw new UnauthorizedException('A bearer access token is required.');
        try {
            const payload = await this.jwt.verifyAsync(token);
            if (payload.accountType !== 'ADMIN') {
                throw new UnauthorizedException('Administrator access is required.');
            }
            return true;
        }
        catch {
            throw new UnauthorizedException('A valid administrator access token is required.');
        }
    }
};
AdminJwtGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [JwtService])
], AdminJwtGuard);
export { AdminJwtGuard };
//# sourceMappingURL=admin-jwt.guard.js.map