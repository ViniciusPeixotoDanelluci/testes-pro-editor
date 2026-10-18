import { Student } from '../../students/entities/student.entity.js';
import type { Relation } from "typeorm";
export declare class Team {
    id: number;
    username: string;
    password: string;
    members?: Relation<Student[]>;
}
