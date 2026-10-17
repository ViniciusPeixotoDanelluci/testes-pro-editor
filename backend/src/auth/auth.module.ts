import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manager } from '../managers/manager.entity.js';
import { Team } from '../teams/team.entity.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Manager, Team])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}