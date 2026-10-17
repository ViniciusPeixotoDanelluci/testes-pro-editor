import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminJwtGuard } from '../auth/admin-jwt.guard.js';
import { TeamsService } from './teams.service.js';
import type { CreateTeamInput, UpdateTeamInput } from './teams.service.js';

@Controller('teams')
@UseGuards(AdminJwtGuard)
export class TeamsController {
  constructor(private readonly teams: TeamsService) {}

  @Get()
  findAll() {
    return this.teams.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.teams.findOne(id);
  }

  @Post()
  create(@Body() body: CreateTeamInput) {
    return this.teams.create(body);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTeamInput,
  ) {
    return this.teams.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.teams.remove(id);
  }
}