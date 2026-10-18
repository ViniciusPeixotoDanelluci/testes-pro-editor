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
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Manager } from './entities/manager.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
let ManagersService = class ManagersService {
    managerRepository;
    constructor(managerRepository) {
        this.managerRepository = managerRepository;
    }
    create(managerDto) {
        const manager = this.managerRepository.create(managerDto);
        if (!manager)
            throw new NotFoundException('Professor não registrado.');
        console.log("professor", manager);
        return this.managerRepository.save(manager);
    }
    findOne(id) {
        const manager = this.managerRepository.findOneBy({ id });
        if (!manager)
            throw new NotFoundException('Professor não encontrado.');
        return manager;
    }
    update(id, updateManagerDto) {
        return `This action updates a #${id} admin`;
    }
    remove(id) {
        return `This action removes a #${id} admin`;
    }
};
ManagersService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Manager)),
    __metadata("design:paramtypes", [Repository])
], ManagersService);
export { ManagersService };
//# sourceMappingURL=manager.service.js.map