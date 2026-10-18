import { Body, Controller, Post } from '@nestjs/common';
import { AuthService, AccountType } from './auth.service.js';
import { SignInDto } from './dto/sign-in.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('refresh')
  refresh(@Body() refreshToken: string) {
    return this.authService.refresh(refreshToken);
  }
}