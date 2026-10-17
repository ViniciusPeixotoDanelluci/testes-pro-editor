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
import { BadRequestException, ConflictException, Injectable, NotFoundException, } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashPassword } from '../common/password.js';
import { Manager } from './manager.entity.js';
let ManagersService = class ManagersService {
    managers;
    config;
    constructor(managers, config) {
        this.managers = managers;
        this.config = config;
    }
    findAll() {
        return this.managers.find();
    }
    async findOne(id) {
        const manager = await this.managers.findOneBy({ id });
        if (!manager)
            throw new NotFoundException('Manager not found.');
        return manager;
    }
    async create(input) {
        this.validate(input.username, input.name, input.password);
        const manager = this.managers.create({
            username: input.username.trim(),
            name: input.name.trim(),
            email: input.email?.trim() || null,
            passwordHash: hashPassword(input.password, this.salt()),
        });
        try {
            const saved = await this.managers.save(manager);
            return this.findOne(saved.id);
        }
        catch (error) {
            if (this.isUniqueConstraintError(error)) {
                throw new ConflictException('Username or email is already registered.');
            }
            throw error;
        }
    }
    async update(id, input) {
        const manager = await this.findOne(id);
        if (input.username !== undefined) {
            if (!input.username.trim())
                throw new BadRequestException('Username cannot be empty.');
            manager.username = input.username.trim();
        }
        if (input.name !== undefined) {
            if (!input.name.trim())
                throw new BadRequestException('Name cannot be empty.');
            manager.name = input.name.trim();
        }
        if (input.email !== undefined)
            manager.email = input.email.trim() || null;
        if (input.password !== undefined) {
            this.validatePassword(input.password);
            manager.passwordHash = hashPassword(input.password, this.salt());
        }
        try {
            await this.managers.save(manager);
            return this.findOne(id);
        }
        catch (error) {
            if (this.isUniqueConstraintError(error)) {
                throw new ConflictException('Username or email is already registered.');
            }
            throw error;
        }
    }
    async remove(id) {
        const manager = await this.findOne(id);
        await this.managers.remove(manager);
        return { deleted: true };
    }
    validate(username, name, password) {
        if (!username?.trim() || !name?.trim()) {
            throw new BadRequestException('Username and name are required.');
        }
        this.validatePassword(password);
    }
    validatePassword(password) {
        if (typeof password !== 'string' || password.length < 3) {
            throw new BadRequestException('Password must be at least 3 characters.');
        }
    }
    salt() {
        return this.config.get('PASSWORD_SALT') ?? 'local-development-salt';
    }
    isUniqueConstraintError(error) {
        return typeof error === 'object' && error !== null && 'code' in error &&
            (error.code === 'SQLITE_CONSTRAINT' ||
                error.code === 'SQLITE_CONSTRAINT_UNIQUE');
    }
};
ManagersService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Manager)),
    __metadata("design:paramtypes", [Repository,
        ConfigService])
], ManagersService);
export { ManagersService };
//# sourceMappingURL=managers.service.js.map