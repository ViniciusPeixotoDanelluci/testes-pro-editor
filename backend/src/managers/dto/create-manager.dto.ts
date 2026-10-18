import { IsEnum, IsInt, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class CreateManagerDto {
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    @IsNotEmpty()
    username!: string

    @IsString()
    @MinLength(3)
    @MaxLength(30)
    @IsNotEmpty()
    password!: string
}
