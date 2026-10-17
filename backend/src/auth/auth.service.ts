import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { passwordMatches } from '../common/password.js';
import { Manager } from '../managers/manager.entity.js';
import { Team } from '../teams/team.entity.js';

export type AccountType = 'ADMIN' | 'TEAM';

interface SignInInput {
  username: string;
  password: string;
  accountType: AccountType;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
    @InjectRepository(Manager)
    private readonly managers: Repository<Manager>,
    @InjectRepository(Team)
    private readonly teams: Repository<Team>,
  ) {}

  async signIn(input: SignInInput) {
    if (
      typeof input?.username !== 'string' ||
      typeof input.password !== 'string' ||
      !['ADMIN', 'TEAM'].includes(input.accountType)
    ) {
      throw new UnauthorizedException('Usuário ou senha inválidos.');
    }

    const prefix = input.accountType;
    const account = input.accountType === 'ADMIN'
      ? await this.managers.createQueryBuilder('manager')
          .addSelect('manager.passwordHash')
          .where('manager.username = :username', { username: input.username })
          .getOne()
      : await this.teams.createQueryBuilder('team')
          .addSelect('team.passwordHash')
          .where('team.username = :username', { username: input.username })
          .getOne();

    const salt = this.config.get<string>('PASSWORD_SALT') ?? 'local-development-salt';
    if (account) {
      if (!passwordMatches(input.password, account.passwordHash, salt)) {
        throw new UnauthorizedException('Usuário ou senha inválidos.');
      }
      return this.createTokens(input.username, input.accountType);
    }

    const username = this.config.get<string>(`${prefix}_USERNAME`);
    const passwordHash = this.config.get<string>(`${prefix}_PASSWORD_HASH`);

    if (
      !username ||
      !passwordHash ||
      input.username !== username ||
      !passwordMatches(input.password, passwordHash, salt)
    ) {
      throw new UnauthorizedException('Usuário ou senha inválidos.');
    }

    return this.createTokens(username, input.accountType);
  }

  private async createTokens(username: string, accountType: AccountType) {
    const payload = { sub: username, accountType };
    const accessToken = await this.jwt.signAsync(payload);
    const refreshToken = await this.jwt.signAsync(payload, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  }
}