import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity.js';

export interface CreateTaskInput {
  title: string;
  description?: string;
  instructions?: string;
  starterCode?: string;
  position?: number;
}

export type UpdateTaskInput = Partial<CreateTaskInput>;

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasks: Repository<Task>,
  ) {}

  findAll() {
    return this.tasks.find({ order: { position: 'ASC', id: 'ASC' } });
  }

  async findOne(id: number) {
    const task = await this.tasks.findOneBy({ id });
    if (!task) throw new NotFoundException('Task not found.');
    return task;
  }

  async create(input: CreateTaskInput) {
    this.validate(input);
    return this.tasks.save(
      this.tasks.create({
        title: input.title.trim(),
        description: input.description ?? '',
        instructions: input.instructions ?? '',
        starterCode: input.starterCode ?? null,
        position: input.position ?? 0,
      }),
    );
  }

  async update(id: number, input: UpdateTaskInput) {
    const task = await this.findOne(id);
    if (input.title !== undefined) {
      if (!input.title.trim()) throw new BadRequestException('Task title cannot be empty.');
      task.title = input.title.trim();
    }
    if (input.description !== undefined) task.description = input.description;
    if (input.instructions !== undefined) task.instructions = input.instructions;
    if (input.starterCode !== undefined) task.starterCode = input.starterCode || null;
    if (input.position !== undefined) {
      if (!Number.isInteger(input.position) || input.position < 0) {
        throw new BadRequestException('Position must be a non-negative integer.');
      }
      task.position = input.position;
    }
    return this.tasks.save(task);
  }

  async remove(id: number) {
    const task = await this.findOne(id);
    await this.tasks.remove(task);
    return { deleted: true };
  }

  private validate(input: CreateTaskInput) {
    if (typeof input?.title !== 'string' || !input.title.trim()) {
      throw new BadRequestException('Task title is required.');
    }
    if (input.position !== undefined && (!Number.isInteger(input.position) || input.position < 0)) {
      throw new BadRequestException('Position must be a non-negative integer.');
    }
  }
}