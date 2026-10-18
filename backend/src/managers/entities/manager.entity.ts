import { Column, PrimaryGeneratedColumn } from "typeorm"

export class Manager {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ length: 50 })
    username!: string

    @Column({ length: 30 })
    password!: string

}
