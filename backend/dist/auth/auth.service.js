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
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from '../teams/entities/team.entity.js';
import { Manager } from '../managers/entities/manager.entity.js';
let AuthService = class AuthService {
    config;
    jwtService;
    managerRepository;
    teamRepository;
    constructor(config, jwtService, managerRepository, teamRepository) {
        this.config = config;
        this.jwtService = jwtService;
        this.managerRepository = managerRepository;
        this.teamRepository = teamRepository;
    }
    async signIn(signInDto) {
        const { username, password, accountType } = signInDto;
        if (!username || !password || !accountType) {
            throw new BadRequestException(" Usuário, tipo de conta, ou senha inválidos / nulos");
        }
        const user = accountType === 'ADMIN'
            ? await this.managerRepository.findOneBy({ username, password })
            : await this.teamRepository.findOneBy({ username, password });
        if (!user) {
            throw new UnauthorizedException('Credenciais inválidas.');
        }
        console.log("usuário a ser logado)", user);
        const payload = {
            id: user.id,
            username: user.username,
            role: accountType,
        };
        const accessToken = this.jwtService.sign({ ...payload, type: 'access' }, { expiresIn: '15m', secret: this.config.getOrThrow('JWT_SECRET') });
        const refreshToken = this.jwtService.sign({ ...payload, type: 'refresh' }, { expiresIn: '5h', secret: this.config.getOrThrow('JWT_SECRET') });
        return { accessToken, refreshToken };
    }
    async refresh(refreshToken) {
        const payload = this.jwtService.verify(refreshToken);
        console.log("payload", payload);
        if (payload.type !== 'refresh') {
            throw new UnauthorizedException('Tipo de token inválido');
        }
        const user = payload.role === 'ADMIN'
            ? await this.managerRepository.findOneBy({ id: payload.id })
            : await this.teamRepository.findOneBy({ id: payload.id });
        if (!user) {
            throw new UnauthorizedException('Refresh token inválido');
        }
        const newPayload = {
            id: user.id,
            username: user.username,
            role: payload.role,
        };
        const newAccessToken = this.jwtService.sign({ ...newPayload, type: 'access' }, { expiresIn: '15m', secret: this.config.getOrThrow('JWT_SECRET') });
        const newRefreshToken = this.jwtService.sign({ ...newPayload, type: 'refresh' }, { expiresIn: '5h', secret: this.config.getOrThrow('JWT_SECRET') });
        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
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