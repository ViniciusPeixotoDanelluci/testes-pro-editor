import { CreateManagerDto } from './dto/create-manager.dto.js';
import { ManagersService } from './manager.service.js';
export declare class ManagersController {
    private readonly managerService;
    constructor(managerService: ManagersService);
    create(createManagerDto: CreateManagerDto): Promise<import("./entities/manager.entity.js").Manager>;
    findOne(id: number): Promise<import("./entities/manager.entity.js").Manager | null>;
}
