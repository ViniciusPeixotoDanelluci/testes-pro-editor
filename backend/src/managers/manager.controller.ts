import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto.js';
import { UpdateManagerDto } from './dto/update-manager.dto.js';
import { ManagersService } from './manager.service.js';

@Controller('managers')
export class ManagersController {
  constructor(private readonly managerService: ManagersService) {}

  @Post()
  create(@Body() createManagerDto: CreateManagerDto) {
    return this.managerService.create(createManagerDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.managerService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: number, @Body() updateManagerDto: UpdateManagerDto) {
  //   return this.managerService.update(+id, updateManagerDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: number) {
  //   return this.managerService.remove(+id);
  // }
}
