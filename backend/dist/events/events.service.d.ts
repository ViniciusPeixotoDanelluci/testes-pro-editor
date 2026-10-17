export interface NewEvent {
    schedule: string;
    duration: number | string;
    date: string;
}
export interface EventRecord {
    id: string;
    schedule: string;
    duration: number;
    date: string;
    createdAt: string;
}
export declare class EventsService {
    private readonly events;
    list(): EventRecord[];
    create(input: NewEvent): EventRecord;
}
