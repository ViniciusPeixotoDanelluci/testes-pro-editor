import { Semesters } from "../../common/semester-enum.js";
import { Team } from "../../teams/entities/team.entity.js";
export declare class CreateStudentDto {
    name: string;
    semester: Semesters;
    team?: Team;
}
