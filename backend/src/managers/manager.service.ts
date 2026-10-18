import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Manager } from './entities/manager.entity.js';
import { CreateManagerDto } from './dto/create-manager.dto.js';
import { UpdateManagerDto } from './dto/update-manager.dto.js';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(Manager)
    private readonly managerRepository: Repository<Manager>
  ) {}

  
  create(managerDto: CreateManagerDto) {
    const manager = this.managerRepository.create(managerDto)

    if (!manager) throw new NotFoundException('Professor não registrado.');

    console.log("professor", manager)
    
    return this.managerRepository.save(manager)
  }

  findOne(id: number) {
    const manager = this.managerRepository.findOneBy({ id });
    
    if (!manager) throw new NotFoundException('Professor não encontrado.');
    
    return manager;
  }


  update(id: number, updateManagerDto: UpdateManagerDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
