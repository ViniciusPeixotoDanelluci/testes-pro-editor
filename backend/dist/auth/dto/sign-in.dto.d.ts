export declare enum UserRole {
    ADMIN = "ADMIN",
    TEAM = "TEAM"
}
export declare class SignInDto {
    username: string;
    password: string;
    accountType: UserRole;
}
