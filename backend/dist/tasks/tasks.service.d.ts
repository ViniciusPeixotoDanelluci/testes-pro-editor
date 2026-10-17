import { Repository } from 'typeorm';
import { Task } from './task.entity.js';
export interface CreateTaskInput {
    title: string;
    description?: string;
    instructions?: string;
    starterCode?: string;
    position?: number;
}
export type UpdateTaskInput = Partial<CreateTaskInput>;
export declare class TasksService {
    private readonly tasks;
    constructor(tasks: Repository<Task>);
    findAll(): Promise<Task[]>;
    findOne(id: number): Promise<Task>;
    create(input: CreateTaskInput): Promise<Task>;
    update(id: number, input: UpdateTaskInput): Promise<Task>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
    private validate;
}
