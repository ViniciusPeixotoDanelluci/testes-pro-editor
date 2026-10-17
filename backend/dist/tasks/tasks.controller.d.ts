import { TasksService } from './tasks.service.js';
import type { CreateTaskInput, UpdateTaskInput } from './tasks.service.js';
export declare class TasksController {
    private readonly tasks;
    constructor(tasks: TasksService);
    findAll(): Promise<import("./task.entity.js").Task[]>;
    findOne(id: number): Promise<import("./task.entity.js").Task>;
    create(body: CreateTaskInput): Promise<import("./task.entity.js").Task>;
    update(id: number, body: UpdateTaskInput): Promise<import("./task.entity.js").Task>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
}
