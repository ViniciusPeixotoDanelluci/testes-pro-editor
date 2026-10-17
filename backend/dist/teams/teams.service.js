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
import { Team } from './team.entity.js';
let TeamsService = class TeamsService {
    teams;
    config;
    constructor(teams, config) {
        this.teams = teams;
        this.config = config;
    }
    findAll() {
        return this.teams.find();
    }
    async findOne(id) {
        const team = await this.teams.findOneBy({ id });
        if (!team)
            throw new NotFoundException('Team not found.');
        return team;
    }
    async create(input) {
        this.validate(input.username, input.name, input.password);
        try {
            const saved = await this.teams.save(this.teams.create({
                username: input.username.trim(),
                name: input.name.trim(),
                semester: input.semester?.trim() || null,
                passwordHash: hashPassword(input.password, this.salt()),
            }));
            return this.findOne(saved.id);
        }
        catch (error) {
            if (this.isUniqueConstraintError(error)) {
                throw new ConflictException('Team username is already registered.');
            }
            throw error;
        }
    }
    async update(id, input) {
        const team = await this.findOne(id);
        if (input.username !== undefined) {
            if (!input.username.trim())
                throw new BadRequestException('Username cannot be empty.');
            team.username = input.username.trim();
        }
        if (input.name !== undefined) {
            if (!input.name.trim())
                throw new BadRequestException('Name cannot be empty.');
            team.name = input.name.trim();
        }
        if (input.semester !== undefined)
            team.semester = input.semester.trim() || null;
        if (input.password !== undefined) {
            this.validatePassword(input.password);
            team.passwordHash = hashPassword(input.password, this.salt());
        }
        try {
            await this.teams.save(team);
            return this.findOne(id);
        }
        catch (error) {
            if (this.isUniqueConstraintError(error)) {
                throw new ConflictException('Team username is already registered.');
            }
            throw error;
        }
    }
    async remove(id) {
        const team = await this.findOne(id);
        await this.teams.remove(team);
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
TeamsService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Team)),
    __metadata("design:paramtypes", [Repository,
        ConfigService])
], TeamsService);
export { TeamsService };
//# sourceMappingURL=teams.service.js.map