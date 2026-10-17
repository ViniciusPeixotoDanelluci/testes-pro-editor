import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminJwtGuard } from '../auth/admin-jwt.guard.js';
import { Manager } from './manager.entity.js';
import { ManagersController } from './managers.controller.js';
import { ManagersService } from './managers.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Manager])],
  controllers: [ManagersController],
  providers: [ManagersService, AdminJwtGuard],
  exports: [ManagersService],
})
export class ManagersModule {}