import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export enum UserRole {
  ADMIN = 'ADMIN',
  TEAM = 'TEAM'
}

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  accountType!: UserRole;
}
