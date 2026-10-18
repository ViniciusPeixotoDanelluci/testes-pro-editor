import { Repository } from 'typeorm';
import { Team } from './entities/team.entity.js';
import { CreateTeamDto } from './dto/create-team.dto.js';
export declare class TeamsService {
    private readonly teamRepository;
    constructor(teamRepository: Repository<Team>);
    findAll(): Promise<Team[]>;
    findOne(id: number): Promise<Team | null>;
    create(createTeamDto: CreateTeamDto): Promise<Team>;
}
