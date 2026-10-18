import { Student } from "../../students/entities/student.entity.js";
export declare class CreateTeamDto {
    username: string;
    password: string;
    members: Student[];
}
