import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Team } from './teams/entities/team.entity.js';
import { Student } from './students/entities/student.entity.js';
import { Manager } from './managers/entities/manager.entity.js';
import { Semesters } from './common/semester-enum.js';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  
  constructor(
    @InjectDataSource()
    private readonly datasource: DataSource
  ) {}

  async seed() {
    await this.datasource.transaction(async (db) => {

      const student1 = db.create(Student, {
        name: 'Joel Schumacker',
        semester: Semesters.FIRST
      })

      await db.save(student1)

      const student2 = db.create(Student, {
        name: 'Carlos Eduardo',
        semester: Semesters.FIFTH
      })

      await db.save(student2)

      const student3 = db.create(Student, {
        name: 'Luis Ricardo',
        semester: Semesters.SECOND
      })

      await db.save(student3)

      const team1 = db.create(Team, {
        username: 'time7',
        password: "123",
        members: [student1, student2, student3]
      })

      await db.save(team1)

      const professor1 = db.create(Manager, {
        username: 'Dina',
        password: "123"
      })

      await db.save(professor1)

      const unassignedStudent = db.create(Student, {
        name: 'Doria',
        semester: Semesters.THIRD,
      });

      await db.save(unassignedStudent);
    })
  }
}

/*
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  
  constructor(
    @InjectDataSource()
    private readonly datasource: DataSource
  ) {}

  async seed() {
    await this.datasource.transaction(async (db) => {
      const students = db.create(Student, [
        { name: 'Joel Schumaker', semester: Semesters['1° Termo'] },
        { name: 'Student Two', semester: Semesters['1° Termo'] },
        { name: 'Student Three', semester: Semesters['1° Termo'] },
      ]);
      await db.save(students);

      const manager = db.create(Manager, {
        username: 'Dina',
        password: '123',
      });
      await db.save(manager);

      const team = db.create(Team, {
        username: 'time7lol',
        password: '123',
      });
      await db.save(team);

      for (const student of students) {
        student.team = team;
      }
      await db.save(students);

      const unassignedStudent = db.create(Student, {
        name: 'Student Without Team',
        semester: Semesters['1° Termo'],
      });
      await db.save(unassignedStudent);
    });
  }
}
*/