import { DataSource } from 'typeorm';
export declare class AppService {
    private readonly datasource;
    getHello(): string;
    constructor(datasource: DataSource);
    seed(): Promise<void>;
}
