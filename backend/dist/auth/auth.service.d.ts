import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Team } from '../teams/entities/team.entity.js';
import { SignInDto } from './dto/sign-in.dto.js';
import { Manager } from '../managers/entities/manager.entity.js';
export type AccountType = 'ADMIN' | 'TEAM';
export declare class AuthService {
    private readonly config;
    private readonly jwtService;
    private readonly managerRepository;
    private readonly teamRepository;
    constructor(config: ConfigService, jwtService: JwtService, managerRepository: Repository<Manager>, teamRepository: Repository<Team>);
    signIn(signInDto: SignInDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refresh(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
