import { ExampleService } from './example.service.js';
import { CreateExampleDto } from './dto/create-example.dto.js';
import { UpdateExampleDto } from './dto/update-example.dto.js';
export declare class ExampleController {
    private readonly exampleService;
    constructor(exampleService: ExampleService);
    create(createExampleDto: CreateExampleDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateExampleDto: UpdateExampleDto): string;
    remove(id: string): string;
}
