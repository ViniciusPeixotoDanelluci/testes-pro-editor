import { AuthService, AccountType } from './auth.service.js';
interface SignInBody {
    username: string;
    password: string;
    accountType: AccountType;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(body: SignInBody): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
export {};
