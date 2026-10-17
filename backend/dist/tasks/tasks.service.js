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
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity.js';
let TasksService = class TasksService {
    tasks;
    constructor(tasks) {
        this.tasks = tasks;
    }
    findAll() {
        return this.tasks.find({ order: { position: 'ASC', id: 'ASC' } });
    }
    async findOne(id) {
        const task = await this.tasks.findOneBy({ id });
        if (!task)
            throw new NotFoundException('Task not found.');
        return task;
    }
    async create(input) {
        this.validate(input);
        return this.tasks.save(this.tasks.create({
            title: input.title.trim(),
            description: input.description ?? '',
            instructions: input.instructions ?? '',
            starterCode: input.starterCode ?? null,
            position: input.position ?? 0,
        }));
    }
    async update(id, input) {
        const task = await this.findOne(id);
        if (input.title !== undefined) {
            if (!input.title.trim())
                throw new BadRequestException('Task title cannot be empty.');
            task.title = input.title.trim();
        }
        if (input.description !== undefined)
            task.description = input.description;
        if (input.instructions !== undefined)
            task.instructions = input.instructions;
        if (input.starterCode !== undefined)
            task.starterCode = input.starterCode || null;
        if (input.position !== undefined) {
            if (!Number.isInteger(input.position) || input.position < 0) {
                throw new BadRequestException('Position must be a non-negative integer.');
            }
            task.position = input.position;
        }
        return this.tasks.save(task);
    }
    async remove(id) {
        const task = await this.findOne(id);
        await this.tasks.remove(task);
        return { deleted: true };
    }
    validate(input) {
        if (typeof input?.title !== 'string' || !input.title.trim()) {
            throw new BadRequestException('Task title is required.');
        }
        if (input.position !== undefined && (!Number.isInteger(input.position) || input.position < 0)) {
            throw new BadRequestException('Position must be a non-negative integer.');
        }
    }
};
TasksService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Task)),
    __metadata("design:paramtypes", [Repository])
], TasksService);
export { TasksService };
//# sourceMappingURL=tasks.service.js.map