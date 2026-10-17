import { EventsService } from './events.service.js';
import type { NewEvent } from './events.service.js';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    list(): import("./events.service.js").EventRecord[];
    create(body: NewEvent): import("./events.service.js").EventRecord;
}
