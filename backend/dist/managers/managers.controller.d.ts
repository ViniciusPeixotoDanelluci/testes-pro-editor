import { ManagersService } from './managers.service.js';
import type { CreateManagerInput, UpdateManagerInput } from './managers.service.js';
export declare class ManagersController {
    private readonly managers;
    constructor(managers: ManagersService);
    findAll(): Promise<import("./manager.entity.js").Manager[]>;
    findOne(id: number): Promise<import("./manager.entity.js").Manager>;
    create(body: CreateManagerInput): Promise<import("./manager.entity.js").Manager>;
    update(id: number, body: UpdateManagerInput): Promise<import("./manager.entity.js").Manager>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
}
