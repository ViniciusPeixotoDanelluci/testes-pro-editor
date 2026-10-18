import { ArrayMaxSize, IsArray, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"
import { Student } from "../../students/entities/student.entity.js"

export class CreateTeamDto {
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @IsNotEmpty()
    username!: string

    @IsString()
    @MinLength(3)
    @MaxLength(30)
    @IsNotEmpty()
    password!: string

    @IsArray()
    @IsString({ each: true })
    @ArrayMaxSize(3, { message: 'Um time pode ter no máximo 3 membros' })
    members!: Student[]
}
