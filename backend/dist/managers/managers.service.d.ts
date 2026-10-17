import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { Manager } from './manager.entity.js';
export interface CreateManagerInput {
    username: string;
    name: string;
    password: string;
    email?: string;
}
export type UpdateManagerInput = Partial<CreateManagerInput>;
export declare class ManagersService {
    private readonly managers;
    private readonly config;
    constructor(managers: Repository<Manager>, config: ConfigService);
    findAll(): Promise<Manager[]>;
    findOne(id: number): Promise<Manager>;
    create(input: CreateManagerInput): Promise<Manager>;
    update(id: number, input: UpdateManagerInput): Promise<Manager>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
    private validate;
    private validatePassword;
    private salt;
    private isUniqueConstraintError;
}
