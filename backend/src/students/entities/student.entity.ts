import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Team } from "../../teams/entities/team.entity.js"

export class Student {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ length: 50 })
    username!: string


    @Column({ length: 30 })
    password?: string

    @ManyToOne(() => Team, (team) => team.members)
    //@JoinColumn({ name: 'teamId' }) // isso apenas explicita a relação, mas não precisa pois já é feito
    team?: Team
}
