import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import type { Relation } from "typeorm"
import { Team } from "../../teams/entities/team.entity.js"
import { Semesters } from "../../common/semester-enum.js"

@Entity('students')
export class Student {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ length: 50 })
    name!: string
    
    @Column({ enum: Semesters })
    semester!: Semesters
    
    @ManyToOne(() => Team, (team) => team.members, { onDelete: "SET NULL" })
    //@JoinColumn({ name: 'teamId' }) // isso apenas explicita a relação, mas não precisa pois já é feito
    team?: Relation<Team>
}
