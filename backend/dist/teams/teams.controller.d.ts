import { TeamsService } from './teams.service.js';
import { CreateTeamDto } from './dto/create-team.dto.js';
export declare class TeamsController {
    private readonly teams;
    constructor(teams: TeamsService);
    findAll(): Promise<import("./entities/team.entity.js").Team[]>;
    findOne(id: number): Promise<import("./entities/team.entity.js").Team | null>;
    create(createTeamDto: CreateTeamDto): Promise<import("./entities/team.entity.js").Team>;
}
