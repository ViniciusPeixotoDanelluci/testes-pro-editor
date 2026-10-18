import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator"
import { Semesters } from "../../common/semester-enum.js"
import { Team } from "../../teams/entities/team.entity.js"

export class CreateStudentDto {
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    @IsNotEmpty()
    name!: string

    @IsString()
    @IsNotEmpty()
    semester!: Semesters

    @IsOptional()
    team?: Team
}
