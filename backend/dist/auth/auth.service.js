var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { passwordMatches } from '../common/password.js';
import { Manager } from '../managers/manager.entity.js';
import { Team } from '../teams/team.entity.js';
let AuthService = class AuthService {
    config;
    jwt;
    managers;
    teams;
    constructor(config, jwt, managers, teams) {
        this.config = config;
        this.jwt = jwt;
        this.managers = managers;
        this.teams = teams;
    }
    async signIn(input) {
        if (typeof input?.username !== 'string' ||
            typeof input.password !== 'string' ||
            !['ADMIN', 'TEAM'].includes(input.accountType)) {
            throw new UnauthorizedException('Usuário ou senha inválidos.');
        }
        const prefix = input.accountType;
        const account = input.accountType === 'ADMIN'
            ? await this.managers.createQueryBuilder('manager')
                .addSelect('manager.passwordHash')
                .where('manager.username = :username', { username: input.username })
                .getOne()
            : await this.teams.createQueryBuilder('team')
                .addSelect('team.passwordHash')
                .where('team.username = :username', { username: input.username })
                .getOne();
        const salt = this.config.get('PASSWORD_SALT') ?? 'local-development-salt';
        if (account) {
            if (!passwordMatches(input.password, account.passwordHash, salt)) {
                throw new UnauthorizedException('Usuário ou senha inválidos.');
            }
            return this.createTokens(input.username, input.accountType);
        }
        const username = this.config.get(`${prefix}_USERNAME`);
        const passwordHash = this.config.get(`${prefix}_PASSWORD_HASH`);
        if (!username ||
            !passwordHash ||
            input.username !== username ||
            !passwordMatches(input.password, passwordHash, salt)) {
            throw new UnauthorizedException('Usuário ou senha inválidos.');
        }
        return this.createTokens(username, input.accountType);
    }
    async createTokens(username, accountType) {
        const payload = { sub: username, accountType };
        const accessToken = await this.jwt.signAsync(payload);
        const refreshToken = await this.jwt.signAsync(payload, { expiresIn: '7d' });
        return { accessToken, refreshToken };
    }
};
AuthService = __decorate([
    Injectable(),
    __param(2, InjectRepository(Manager)),
    __param(3, InjectRepository(Team)),
    __metadata("design:paramtypes", [ConfigService,
        JwtService,
        Repository,
        Repository])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map