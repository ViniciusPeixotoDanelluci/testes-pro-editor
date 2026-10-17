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
import { Team } from './team.entity.js';

export interface CreateTeamInput {
  username: string;
  name: string;
  password: string;
  semester?: string;
}

export type UpdateTeamInput = Partial<CreateTeamInput>;

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teams: Repository<Team>,
    private readonly config: ConfigService,
  ) {}

  findAll() {
    return this.teams.find();
  }

  async findOne(id: number) {
    const team = await this.teams.findOneBy({ id });
    if (!team) throw new NotFoundException('Team not found.');
    return team;
  }

  async create(input: CreateTeamInput) {
    this.validate(input.username, input.name, input.password);
    try {
      const saved = await this.teams.save(
        this.teams.create({
          username: input.username.trim(),
          name: input.name.trim(),
          semester: input.semester?.trim() || null,
          passwordHash: hashPassword(input.password, this.salt()),
        }),
      );
      return this.findOne(saved.id);
    } catch (error) {
      if (this.isUniqueConstraintError(error)) {
        throw new ConflictException('Team username is already registered.');
      }
      throw error;
    }
  }

  async update(id: number, input: UpdateTeamInput) {
    const team = await this.findOne(id);
    if (input.username !== undefined) {
      if (!input.username.trim()) throw new BadRequestException('Username cannot be empty.');
      team.username = input.username.trim();
    }
    if (input.name !== undefined) {
      if (!input.name.trim()) throw new BadRequestException('Name cannot be empty.');
      team.name = input.name.trim();
    }
    if (input.semester !== undefined) team.semester = input.semester.trim() || null;
    if (input.password !== undefined) {
      this.validatePassword(input.password);
      team.passwordHash = hashPassword(input.password, this.salt());
    }
    try {
      await this.teams.save(team);
      return this.findOne(id);
    } catch (error) {
      if (this.isUniqueConstraintError(error)) {
        throw new ConflictException('Team username is already registered.');
      }
      throw error;
    }
  }

  async remove(id: number) {
    const team = await this.findOne(id);
    await this.teams.remove(team);
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