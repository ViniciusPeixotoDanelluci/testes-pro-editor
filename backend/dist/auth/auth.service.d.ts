import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Manager } from '../managers/manager.entity.js';
import { Team } from '../teams/team.entity.js';
export type AccountType = 'ADMIN' | 'TEAM';
interface SignInInput {
    username: string;
    password: string;
    accountType: AccountType;
}
export declare class AuthService {
    private readonly config;
    private readonly jwt;
    private readonly managers;
    private readonly teams;
    constructor(config: ConfigService, jwt: JwtService, managers: Repository<Manager>, teams: Repository<Team>);
    signIn(input: SignInInput): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    private createTokens;
}
export {};
