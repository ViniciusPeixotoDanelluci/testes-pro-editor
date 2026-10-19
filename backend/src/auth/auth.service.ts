import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from '../teams/entities/team.entity.js';
import { SignInDto } from './dto/sign-in.dto.js';
import { Manager } from '../managers/entities/manager.entity.js';

export type AccountType = 'ADMIN' | 'TEAM';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
    @InjectRepository(Manager)
    private readonly managerRepository: Repository<Manager>,
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

//   async signUp(username: string, password: string, accountType: string = '') {
//     // const existingUser = users.find((user) => user.email === email);
    

//     if (!password || !username) throw new BadRequestException("Password / Username nulos")

//     const existingUser = accountType === 'ADMIN'
//       ? await this.managerRepository.findOneBy({ username })
//       : await this.teamRepository.findOneBy({ username })
    
//     if (existingUser) {
//       return new BadRequestException('Nome de usuário/time já existente');
//     }

//     const user = {
//       username,
//       password,
//       // accountType,
//     };

//     console.log('logado', user);
//     const { password: _, ...result } = user;

//     return result;
// /// meu
//          const { password, username } = signUpDto
//         if (password===undefined) throw new BadRequestException("ta uma bosta esse password nulo")
//         const salt = randomBytes(8).toString('hex')
//         const hash = await scrypt(password, salt, 32) as Buffer

//         const saltNhash = `${salt}.${hash.toString('hex')}`

//         const user = {
//             username,
//             password: saltNhash
//         }

//         //this.userRepository.save(user)
//         const { password: _, ...result } = user
//         return result
//         ////
//   }

  async signIn(signInDto: SignInDto) {
    const { username, password, accountType } = signInDto
    
    if (!username || !password || !accountType) {
      throw new BadRequestException(" Usuário, tipo de conta, ou senha inválidos / nulos")
    }

    // if (
    //   typeof username !== 'string' ||
    //   typeof password !== 'string' ||
    //   !['ADMIN', 'TEAM'].includes(accountType)
    // ) {
    //   throw new UnauthorizedException('Usuário, tipo de conta ou senha inválidos.');
    // }

    // const prefix = input.accountType;
    
    const user = accountType === 'ADMIN'
      ? await this.managerRepository.findOneBy({ username, password })
      : await this.teamRepository.findOneBy({ username, password })

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas.')
    }
    
    console.log("usuário a ser logado)", user)

    const payload = {
      id: user.id,
      username: user.username,
      role: accountType,
    };

    const accessToken = this.jwtService.sign(
      { ...payload, type: 'access'},
      { expiresIn: '15m', secret: this.config.getOrThrow<string>('JWT_SECRET') },
    );

    const refreshToken = this.jwtService.sign(
      { ...payload, type: 'refresh' },
      { expiresIn: '5h', secret: this.config.getOrThrow<string>('JWT_SECRET') },
    );

    // repo.push({ value: refreshToken });

    return { accessToken, refreshToken };
  }




  async refresh(refreshToken: string) {
    // const storedToken = repo.find(
    //   (token) => token.value === refreshToken,
    // );
    // if (!storedToken) {
    //   throw new UnauthorizedException('Invalid refresh token');
    // }

    const payload = this.jwtService.verify(refreshToken);

    console.log("payload", payload)

    if (payload.type !== 'refresh') {
      throw new UnauthorizedException('Tipo de token inválido');
    }
    
    const user = payload.role === 'ADMIN'
      ? await this.managerRepository.findOneBy({ id: payload.id })
      : await this.teamRepository.findOneBy({ id: payload.id })

    if (!user) {
      throw new UnauthorizedException('Refresh token inválido');
    }

    const newPayload = {
      id: user.id,
      username: user.username,
      role: payload.role,
    };

    const newAccessToken = this.jwtService.sign(
      { ...newPayload, type: 'access' },
      { expiresIn: '15m', secret: this.config.getOrThrow<string>('JWT_SECRET') },
    );

    const newRefreshToken = this.jwtService.sign(
      { ...newPayload, type: 'refresh' },
      { expiresIn: '5h', secret: this.config.getOrThrow<string>('JWT_SECRET') },
    );

    // storedToken.value = newRefreshToken;

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    
    /*
    if (
      typeof input?.username !== 'string' ||
      typeof input.password !== 'string' ||
      !['ADMIN', 'TEAM'].includes(input.accountType)
    ) {
      throw new UnauthorizedException('Usuário ou senha inválidos.');
    }


    const userId = payload.id ?? payload.userId;

    if (userId === undefined) {
      throw new UnauthorizedException('Refresh token has no user ID');
    }

    const user = await repository.findOneBy({ id: userId });


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
  
  /// phil
  async refresh(refreshToken: string) {
    const storedToken = refreshTokens.find(
      (token) => token.value === refreshToken,
    );
    if (!storedToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const payload = this.jwtService.verify(refreshToken);
    if (payload.type !== 'refresh') {
      throw new UnauthorizedException('Invalid token type');
    }
    const user = users.find((user) => user.id === payload.sub);
    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const newPayload = {
      username: user.email,
      sub: user.id,
      roles: user.roles,
    };

    const newAccessToken = this.jwtService.sign(
      { ...newPayload, type: 'access' },
      { expiresIn: '60s' },
    );

    const newRefreshToken = this.jwtService.sign(
      { ...newPayload, type: 'refresh' },
      { expiresIn: '1h' },
    );

    storedToken.value = newRefreshToken;

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  private async createTokens(username: string, accountType: AccountType) {
    const payload = { sub: username, accountType };
    const accessToken = await this.jwt.signAsync(payload);
    const refreshToken = await this.jwt.signAsync(payload, { expiresIn: '7d' });

    return { accessToken, refreshToken };
    */
    }

}