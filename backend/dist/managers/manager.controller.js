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
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto.js';
import { ManagersService } from './manager.service.js';
let ManagersController = class ManagersController {
    managerService;
    constructor(managerService) {
        this.managerService = managerService;
    }
    create(createManagerDto) {
        return this.managerService.create(createManagerDto);
    }
    findOne(id) {
        return this.managerService.findOne(+id);
    }
};
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateManagerDto]),
    __metadata("design:returntype", void 0)
], ManagersController.prototype, "create", null);
__decorate([
    Get(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ManagersController.prototype, "findOne", null);
ManagersController = __decorate([
    Controller('managers'),
    __metadata("design:paramtypes", [ManagersService])
], ManagersController);
export { ManagersController };
//# sourceMappingURL=manager.controller.js.map