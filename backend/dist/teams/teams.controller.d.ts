import { TeamsService } from './teams.service.js';
import type { CreateTeamInput, UpdateTeamInput } from './teams.service.js';
export declare class TeamsController {
    private readonly teams;
    constructor(teams: TeamsService);
    findAll(): Promise<import("./team.entity.js").Team[]>;
    findOne(id: number): Promise<import("./team.entity.js").Team>;
    create(body: CreateTeamInput): Promise<import("./team.entity.js").Team>;
    update(id: number, body: UpdateTeamInput): Promise<import("./team.entity.js").Team>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
}
