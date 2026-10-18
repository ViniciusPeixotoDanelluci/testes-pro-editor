import { CreateExampleDto } from './dto/create-example.dto.js';
import { UpdateExampleDto } from './dto/update-example.dto.js';
export declare class ExampleService {
    create(createExampleDto: CreateExampleDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateExampleDto: UpdateExampleDto): string;
    remove(id: number): string;
}
