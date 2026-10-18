import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('managers')
export class Manager {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ length: 50 })
    username!: string

    @Column({ length: 30 })
    password!: string

}
