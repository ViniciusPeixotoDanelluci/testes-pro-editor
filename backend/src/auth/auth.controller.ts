import { Body, Controller, Post } from '@nestjs/common';
import { AuthService, AccountType } from './auth.service.js';

interface SignInBody {
  username: string;
  password: string;
  accountType: AccountType;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() body: SignInBody) {
    return this.authService.signIn(body);
  }
}