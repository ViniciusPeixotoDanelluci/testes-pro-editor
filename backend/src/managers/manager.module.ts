import { Module } from '@nestjs/common';
import { ManagersService } from './manager.service.js';
import { ManagersController } from './manager.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manager } from './entities/manager.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Manager])],
  controllers: [ManagersController],
  providers: [ManagersService],
  exports: [ManagersService],
})
export class ManagerModule {}
