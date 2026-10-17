import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { Team } from './team.entity.js';
export interface CreateTeamInput {
    username: string;
    name: string;
    password: string;
    semester?: string;
}
export type UpdateTeamInput = Partial<CreateTeamInput>;
export declare class TeamsService {
    private readonly teams;
    private readonly config;
    constructor(teams: Repository<Team>, config: ConfigService);
    findAll(): Promise<Team[]>;
    findOne(id: number): Promise<Team>;
    create(input: CreateTeamInput): Promise<Team>;
    update(id: number, input: UpdateTeamInput): Promise<Team>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
    private validate;
    private validatePassword;
    private salt;
    private isUniqueConstraintError;
}
