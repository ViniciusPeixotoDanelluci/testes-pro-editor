import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashPassword } from '../common/password.js';
import { Manager } from './manager.entity.js';

export interface CreateManagerInput {
  username: string;
  name: string;
  password: string;
  email?: string;
}

export type UpdateManagerInput = Partial<CreateManagerInput>;

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(Manager)
    private readonly managers: Repository<Manager>,
    private readonly config: ConfigService,
  ) {}

  findAll() {
    return this.managers.find();
  }

  async findOne(id: number) {
    const manager = await this.managers.findOneBy({ id });
    if (!manager) throw new NotFoundException('Manager not found.');
    return manager;
  }

  async create(input: CreateManagerInput) {
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
    } catch (error) {
      if (this.isUniqueConstraintError(error)) {
        throw new ConflictException('Username or email is already registered.');
      }
      throw error;
    }
  }

  async update(id: number, input: UpdateManagerInput) {
    const manager = await this.findOne(id);
    if (input.username !== undefined) {
      if (!input.username.trim()) throw new BadRequestException('Username cannot be empty.');
      manager.username = input.username.trim();
    }
    if (input.name !== undefined) {
      if (!input.name.trim()) throw new BadRequestException('Name cannot be empty.');
      manager.name = input.name.trim();
    }
    if (input.email !== undefined) manager.email = input.email.trim() || null;
    if (input.password !== undefined) {
      this.validatePassword(input.password);
      manager.passwordHash = hashPassword(input.password, this.salt());
    }
    try {
      await this.managers.save(manager);
      return this.findOne(id);
    } catch (error) {
      if (this.isUniqueConstraintError(error)) {
        throw new ConflictException('Username or email is already registered.');
      }
      throw error;
    }
  }

  async remove(id: number) {
    const manager = await this.findOne(id);
    await this.managers.remove(manager);
    return { deleted: true };
  }

  private validate(username: string, name: string, password: string) {
    if (!username?.trim() || !name?.trim()) {
      throw new BadRequestException('Username and name are required.');
    }
    this.validatePassword(password);
  }

  private validatePassword(password: string) {
    if (typeof password !== 'string' || password.length < 3) {
      throw new BadRequestException('Password must be at least 3 characters.');
    }
  }

  private salt() {
    return this.config.get<string>('PASSWORD_SALT') ?? 'local-development-salt';
  }

  private isUniqueConstraintError(error: unknown) {
    return typeof error === 'object' && error !== null && 'code' in error &&
      ((error as { code: string }).code === 'SQLITE_CONSTRAINT' ||
        (error as { code: string }).code === 'SQLITE_CONSTRAINT_UNIQUE');
  }
}