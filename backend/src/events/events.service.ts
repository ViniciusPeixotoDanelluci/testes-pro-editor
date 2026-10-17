import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

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

@Injectable()
export class EventsService {
  private readonly events: EventRecord[] = [];

  list() {
    return this.events;
  }

  create(input: NewEvent) {
    const duration = Number(input?.duration);
    const date = typeof input?.date === 'string' ? input.date : '';
    const [year, month, day] = date.split('-').map(Number);
    const validDate =
      Number.isInteger(year) &&
      Number.isInteger(month) &&
      Number.isInteger(day) &&
      new Date(Date.UTC(year, month - 1, day)).toISOString().slice(0, 10) === date;

    if (
      typeof input?.schedule !== 'string' ||
      !/^([01]\d|2[0-3]):[0-5]\d$/.test(input.schedule) ||
      !Number.isInteger(duration) ||
      duration < 1 ||
      duration > 1440 ||
      !validDate
    ) {
      throw new BadRequestException(
        'Informe uma data válida, horário HH:mm e duração entre 1 e 1440 minutos.',
      );
    }

    const event: EventRecord = {
      id: randomUUID(),
      schedule: input.schedule,
      duration,
      date: input.date,
      createdAt: new Date().toISOString(),
    };
    this.events.push(event);
    return event;
  }
}