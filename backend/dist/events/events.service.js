var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
let EventsService = class EventsService {
    events = [];
    list() {
        return this.events;
    }
    create(input) {
        const duration = Number(input?.duration);
        const date = typeof input?.date === 'string' ? input.date : '';
        const [year, month, day] = date.split('-').map(Number);
        const validDate = Number.isInteger(year) &&
            Number.isInteger(month) &&
            Number.isInteger(day) &&
            new Date(Date.UTC(year, month - 1, day)).toISOString().slice(0, 10) === date;
        if (typeof input?.schedule !== 'string' ||
            !/^([01]\d|2[0-3]):[0-5]\d$/.test(input.schedule) ||
            !Number.isInteger(duration) ||
            duration < 1 ||
            duration > 1440 ||
            !validDate) {
            throw new BadRequestException('Informe uma data válida, horário HH:mm e duração entre 1 e 1440 minutos.');
        }
        const event = {
            id: randomUUID(),
            schedule: input.schedule,
            duration,
            date: input.date,
            createdAt: new Date().toISOString(),
        };
        this.events.push(event);
        return event;
    }
};
EventsService = __decorate([
    Injectable()
], EventsService);
export { EventsService };
//# sourceMappingURL=events.service.js.map