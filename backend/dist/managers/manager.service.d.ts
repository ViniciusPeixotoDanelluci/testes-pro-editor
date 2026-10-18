import { Repository } from 'typeorm';
import { Manager } from './entities/manager.entity.js';
import { CreateManagerDto } from './dto/create-manager.dto.js';
import { UpdateManagerDto } from './dto/update-manager.dto.js';
export declare class ManagersService {
    private readonly managerRepository;
    constructor(managerRepository: Repository<Manager>);
    create(managerDto: CreateManagerDto): Promise<Manager>;
    findOne(id: number): Promise<Manager | null>;
    update(id: number, updateManagerDto: UpdateManagerDto): string;
    remove(id: number): string;
}
