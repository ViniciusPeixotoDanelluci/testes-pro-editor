var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Team } from './teams/entities/team.entity.js';
import { Student } from './students/entities/student.entity.js';
import { Manager } from './managers/entities/manager.entity.js';
import { Semesters } from './common/semester-enum.js';
let AppService = class AppService {
    datasource;
    getHello() {
        return 'Hello World!';
    }
    constructor(datasource) {
        this.datasource = datasource;
    }
    async seed() {
        await this.datasource.transaction(async (db) => {
            const student1 = db.create(Student, {
                name: 'Joel Schumacker',
                semester: Semesters.FIRST
            });
            await db.save(student1);
            const student2 = db.create(Student, {
                name: 'Carlos Eduardo',
                semester: Semesters.FIFTH
            });
            await db.save(student2);
            const student3 = db.create(Student, {
                name: 'Lula',
                semester: Semesters.SECOND
            });
            await db.save(student3);
            const team1 = db.create(Team, {
                username: 'time7',
                password: "123",
                members: [student1, student2, student3]
            });
            await db.save(team1);
            const professor1 = db.create(Manager, {
                username: 'Dina',
                password: "123"
            });
            await db.save(professor1);
            const unassignedStudent = db.create(Student, {
                name: 'Doria',
                semester: Semesters.THIRD,
            });
            await db.save(unassignedStudent);
        });
    }
};
AppService = __decorate([
    Injectable(),
    __param(0, InjectDataSource()),
    __metadata("design:paramtypes", [DataSource])
], AppService);
export { AppService };
//# sourceMappingURL=app.service.js.map