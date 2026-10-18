import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from '../../students/entities/student.entity.js';
import type { Relation } from "typeorm"

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 20 })
  username!: string;

  @Column({ length: 30 })
  password!: string;

  @OneToMany(() => Student, (student) => student.team, { nullable: true })
  members?: Relation<Student[]>

}