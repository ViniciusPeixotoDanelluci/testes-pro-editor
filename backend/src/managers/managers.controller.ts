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
import { ManagersService } from './managers.service.js';
import type {
  CreateManagerInput,
  UpdateManagerInput,
} from './managers.service.js';

@Controller('managers')
@UseGuards(AdminJwtGuard)
export class ManagersController {
  constructor(private readonly managers: ManagersService) {}

  @Get()
  findAll() {
    return this.managers.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.managers.findOne(id);
  }

  @Post()
  create(@Body() body: CreateManagerInput) {
    return this.managers.create(body);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateManagerInput,
  ) {
    return this.managers.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.managers.remove(id);
  }
}