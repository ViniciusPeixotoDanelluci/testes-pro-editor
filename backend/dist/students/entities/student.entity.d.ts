import type { Relation } from "typeorm";
import { Team } from "../../teams/entities/team.entity.js";
import { Semesters } from "../../common/semester-enum.js";
export declare class Student {
    id: number;
    name: string;
    semester: Semesters;
    team?: Relation<Team>;
}
